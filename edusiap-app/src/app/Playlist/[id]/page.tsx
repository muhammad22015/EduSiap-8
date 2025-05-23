"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Video {
  video_link?: string;  // properti URL video
  title: string;
  view_count: number;
  upload_date: string;
}

interface PlaylistVideo {
  playlist_id: number;
  video_id: number;
  position: number;
  playlist: {
    title: string;
  };
  video: Video;
}

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [videos, setVideos] = useState<PlaylistVideo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi mengubah YouTube / Google Drive link ke embed url iframe
  const getEmbedUrl = (url?: string) => {
    if (!url) return "";

    // YouTube long URL
    const ytRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const ytMatch = url.match(ytRegex);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // YouTube short URL
    const ytShortRegex = /(?:https?:\/\/)?youtu\.be\/([^?&]+)/;
    const ytShortMatch = url.match(ytShortRegex);
    if (ytShortMatch && ytShortMatch[1]) {
      return `https://www.youtube.com/embed/${ytShortMatch[1]}`;
    }

    // Google Drive file URL
    const gdRegex = /\/file\/d\/([^/]+)\//;
    const gdMatch = url.match(gdRegex);
    if (gdMatch && gdMatch[1]) {
      return `https://drive.google.com/file/d/${gdMatch[1]}/preview`;
    }

    // Kalau bukan match pattern apa pun, return url apa adanya
    return url;
  };

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/playlists-videos?id=${id}`);
        const data = await res.json();
        if (data && data.response) {
          setVideos(data.response);
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
              {videos.map((item) => {
                const embedUrl = getEmbedUrl(item.video.video_link);

                return (
                  <div
                    key={`${item.video_id}-${item.position}`}
                    onClick={() => router.push(`/WatchVideo/${item.video_id}`)}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
                  >
                    <h2 className="text-lg font-semibold text-lime-900 mb-2 text-center">
                      {item.video.title}
                    </h2>
                    <div className="aspect-video">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={item.video.title}
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="w-full h-56 rounded-md"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center">
                          <span>Video unavailable</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlaylistDetailPage;
