// WatchVideo/[idVideo]/page.tsx
'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { watchVideo } from '@/lib/api';

interface Video {
  video_id: number;
  title: string;
  video_link: string;
}

export default function WatchVideoPage() {
  const { idVideo } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/videos?id=${idVideo}`);
        const data = await res.json();

        if (data.status === 'Authorized') {
          setVideo(data.response[0]);
          
          // Call watchVideo API if user is authenticated
          if (isAuthenticated) {
            try {
              await watchVideo(Number(idVideo));
            } catch (error) {
              console.error('Failed to update video history:', error);
            }
          }
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [idVideo, isAuthenticated]);

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Doodle Background Sedikit Lebih Kecil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/doodle.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '110% auto',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>

      <Sidebar />
      <main className="flex-1 py-0 max-max-xl:px-5 max-max-xl:py-0 ml-[120px] mt-[120px] mb-[30px] max-sm:ml-0 relative z-10">
        <Header />
        <div className="flex flex-col w-full items-center justify-center">
          {loading ? (
            <p className="text-center text-xl text-gray-600 mt-20">Loading video...</p>
          ) : video ? (
            <>
              <div className="w-full max-w-6xl flex justify-center items-center mb-6 relative">
                {/* Box background putih transparan di belakang video */}
                <div className="absolute w-full h-full bg-white opacity-60 rounded-2xl z-0" />
                <iframe
                  className="bg-white w-full h-[600px] rounded-2xl border border-black max-sm:h-50 max-xl:h-80 max-xl:w-4/5 relative z-10"
                  src={video.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h1 className="text-3xl font-bold text-black mt-6 px-10 max-sm:text-lg max-sm:mt-0 max-sm:px-5 max-xl:text-2xl">
                {video.title}
              </h1>
              <div className="flex flex-row gap-8 h-16 w-full items-center justify-center mt-6 max-sm:mt-0">
                <Link href={`/WatchVideo/${idVideo}/quiz`}>
                  <button
                    className="w-48 h-14 bg-green-800 rounded-2xl text-2xl text-white 
                    max-xl:w-32 max-xl:h-12 max-xl:text-xl 
                    max-sm:text-lg max-sm:w-24 max-sm:h-8
                    transition-transform duration-300 ease-in-out transform 
                    hover:scale-110 hover:shadow-2xl"
                  >
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
