"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Video {
  video_id: number;
  video_url: string;
  title: string;
  description: string;
  video_link: string;
  thumbnail?: string; // properti thumbnail baru
}

interface History {
  history_id: number;
  video_id: number;
  user_id: number;
  watched_at: string;
  video?: Video | null;
}

const HistoryPage = () => {
  const [histories, setHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setError("User ID tidak ditemukan di query parameter.");
        setLoading(false);
        return;
      }

      try {
        // Ambil data history dan data video sekaligus
        const [historyRes, videoRes] = await Promise.all([
          fetch(`http://localhost:5000/history?id=${userId}`),
          fetch("http://localhost:5000/videos"),
        ]);

        const historyData = await historyRes.json();
        const videoData = await videoRes.json();

        if (!historyRes.ok)
          throw new Error(historyData.message || "Gagal mengambil data history.");
        if (!videoRes.ok)
          throw new Error(videoData.message || "Gagal mengambil data video.");

        const videoList: Video[] = videoData.response;

        // Gabungkan video ke masing-masing history
        const combined = historyData.response.map((history: History) => {
          const matchedVideo = videoList.find((v) => v.video_id === history.video_id);
          return {
            ...history,
            video: matchedVideo || null,
          };
        });

        setHistories(combined);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 ml-[97px]">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10">
          <h1 className="text-4xl font-bold mb-8 text-black text-center">
            Riwayat Video yang Ditonton
          </h1>

          {loading ? (
            <p className="text-gray-700">Memuat data...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : histories.length === 0 ? (
            <p className="text-gray-600">Belum ada riwayat video.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
              {histories.map((item) => (
                <div
                  key={`${item.history_id}-${item.video_id}`}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/WatchVideo/${item.video_id}`)}
                >
                  <div className="w-full mb-4">
                    {item.video?.thumbnail ? (
                      <img
                        src={item.video.thumbnail}
                        alt={item.video.title}
                        className="w-full h-56 object-contain rounded-md"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">Thumbnail tidak tersedia</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-center text-lime-900">
                    {item.video?.title ?? "Judul tidak tersedia"}
                  </h2>
                  <p className="text-sm text-center text-gray-600">
                    Ditonton pada: {new Date(item.watched_at).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
