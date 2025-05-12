"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Video {
  video_id: number;
  video_url: string;
  title: string;
  description: string;
  video_link: string; // Mengambil video_link dari tabel
}

interface PlaylistVideo {
  video: Video;
  position: number;
}

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [videos, setVideos] = useState<PlaylistVideo[]>([]);
  const [loading, setLoading] = useState(true);

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
    const fetchPlaylistVideos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/playlists-videos?id=${id}`);
        const data = await res.json();
        if (data && data.response) {
          setVideos(data.response); // Menyimpan video ke state
        }
      } catch (err) {
        console.error("Failed to fetch playlist videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 ml-[97px]">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-black text-center">
            Video Playlist {id}
          </h1>

          {loading ? (
            <p className="text-center">Memuat video...</p>
          ) : videos.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada video dalam playlist ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
              {videos.map((item) => (
                <div
                  key={item.video.video_id}
                  onClick={() => router.push(`/WatchVideo/${item.video.video_id}`)}
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="w-full mb-4">
                    {/* Menampilkan iframe video */}
                    <div className="aspect-video">
                      <iframe
                        src={getEmbedUrl(item.video.video_link)} // Menggunakan fungsi getEmbedUrl
                        title={item.video.title}
                        frameBorder="0"
                        allowFullScreen
                        className="w-full h-56 rounded-md pointer-events-none"
                      />
                    </div>
                  </div>
                  {/* Menampilkan judul video */}
                  <h2 className="text-lg font-semibold text-lime-900 mb-2 text-center">
                    {item.video.title}
                  </h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlaylistDetailPage;
