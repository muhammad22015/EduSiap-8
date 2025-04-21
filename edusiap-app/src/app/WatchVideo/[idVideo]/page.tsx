'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { VideoCard } from '@/components/VideoCard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Video {
  id: number;
  title: string;
  uploader: string;
  video_url: string;
  thumbnail: string;
}

export default function WatchVideoPage() {
  const { idVideo } = useParams();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/videos/watch?id=${idVideo}`);
        const data = await res.json();
        if (data.status === 'Authorized') {
          setVideo(data.response);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideo();
  }, [idVideo]);

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[97px]">
        <Header />
        <div className="flex flex-col w-full items-center justify-center">
          {video ? (
            <>
              <div className="w-full h-200 flex justify-center items-center">
                <iframe
                  className='bg-white w-300 h-180 rounded-2xl border border-black'
                  src={video.video_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h1 className="text-4xl font-bold text-black mt-6">{video.title}</h1>
              <p className="text-xl text-gray-700">{video.uploader}</p>
              <div className="flex flex-row gap-12 h-50 w-full items-center justify-center mt-6">
                <Link href={`/WatchVideo/${idVideo}/quiz`}>
                  <button className='w-70 h-25 bg-green-800 rounded-2xl text-5xl'>QUIZ</button>
                </Link>
                <Link href="/pdfReader">
                  <button className='w-70 h-25 bg-blue-800 rounded-2xl text-5xl text-white'>Download Materi</button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-xl text-gray-600 mt-20">Loading video...</p>
          )}
        </div>
      </main>
    </div>
  );
}
