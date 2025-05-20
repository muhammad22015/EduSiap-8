'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Video {
  video_id: number;  // Sesuai dengan response backend
  title: string;
  video_link: string;
  // Tambahkan field lain sesuai response
}

export default function WatchVideoPage() {
  const { idVideo } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/videos?id=${idVideo}`);
        const data = await res.json();
        
        if (data.status === 'Authorized') {
          // Ambil video pertama dari array response
          setVideo(data.response[0]); // <-- Perubahan utama di sini
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [idVideo]);

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[120px] mt-[120px] mb-[30px]">
        <Header />
        <div className="flex flex-col w-full items-center justify-center">
          {loading ? (
            <p className="text-center text-xl text-gray-600 mt-20">Loading video...</p>
          ) : video ? (
            <>
              <div className="w-full max-w-6xl flex justify-center items-center mb-6">
                <iframe
                  className="bg-white w-full h-[600px] rounded-2xl border border-black"
                  src={video.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h1 className="text-3xl font-bold text-black mt-6 px-10">{video.title}</h1>
              <div className="flex flex-row gap-8 h-16 w-full items-center justify-center mt-6">
                <Link href={`/WatchVideo/${idVideo}/quiz`}>
                  <button className="w-48 h-14 bg-green-800 rounded-2xl text-2xl text-white">
                    QUIZ
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-xl text-gray-600 mt-20">Video not found.</p>
          )}
        </div>
      </main>
    </div>
  );
}