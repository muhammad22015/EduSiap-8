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
  video_link: string; // Mengambil video_link dari tabel
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

  // Fungsi untuk mengubah URL YouTube menjadi format embed
  const getEmbedUrl = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)([^&?/]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url; // Jika bukan URL YouTube, kembalikan url yang asli
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setError("User ID tidak ditemukan di query parameter.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/history?id=${userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil data history.");
        }

        if (data?.response?.length > 0) {
          setHistories(data.response);
        } else {
          setHistories([]);
        }
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
                  key={`${item.history_id}-${item.video_id}`} // Kombinasikan history_id dan video_id untuk memastikan keunikan
                  className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => router.push(`/WatchVideo/${item.video_id}`)} // Navigasi ke halaman video
                >
                  {/* Menampilkan iframe video */}
                  <div className="w-full mb-4">
                    {item.video?.video_link && (
                      <div className="aspect-video">
                        <iframe
                          src={getEmbedUrl(item.video.video_link)} // Menggunakan fungsi getEmbedUrl
                          title={item.video.title}
                          frameBorder="0"
                          allowFullScreen
                          className="w-full h-56 rounded-md pointer-events-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Menampilkan judul video */}
                  <h2 className="text-xl font-semibold text-center text-lime-900">
                    {item.video?.title ?? "Judul tidak tersedia"}
                  </h2>
                  <p className="text-sm text-center text-gray-600">
                    Ditonton pada:{" "}
                    {new Date(item.watched_at).toLocaleString("id-ID")}
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
