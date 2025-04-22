'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Video {
  id: number;
  title: string;
  uploader: string;
  video_link: string; // Menggunakan 'video_link' sesuai nama kolom di database
}

export default function WatchVideoPage() {
  const { idVideo } = useParams(); // Mengambil ID video dari URL parameter
  const [video, setVideo] = useState<Video | null>(null); // State untuk menyimpan data video
  const [loading, setLoading] = useState(true); // State loading untuk menunggu data

  // Mengambil data video berdasarkan ID saat komponen pertama kali di-render
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/videos/watch?id=${idVideo}`);
        const data = await res.json();
        
        // Jika statusnya 'Authorized', maka simpan data video ke state
        if (data.status === 'Authorized') {
          setVideo(data.response);
        }
        setLoading(false); // Mengubah loading menjadi false setelah data diterima
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading false jika terjadi error
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
          {loading ? (
            <p className="text-center text-xl text-gray-600 mt-20">Loading video...</p>
          ) : video ? (
            <>
              {/* Menampilkan video menggunakan iframe */}
              <div className="w-full max-w-6xl flex justify-center items-center mb-6">
                <iframe
                  className="bg-white w-full h-[600px] rounded-2xl border border-black"
                  src={video.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h1 className="text-3xl font-bold text-black mt-6">{video.title}</h1>
              <p className="text-lg text-gray-700 mb-6">{video.uploader}</p>
              <div className="flex flex-row gap-8 h-16 w-full items-center justify-center mt-6">
                <Link href={`/WatchVideo/${idVideo}/quiz`}>
                  <button className="w-48 h-14 bg-green-800 rounded-2xl text-2xl text-white">
                    QUIZ
                  </button>
                </Link>
                {/* <Link href="/pdfReader">
                  <button className="w-48 h-14 bg-green-800 rounded-2xl text-2xl text-white">
                    Story Book
                  </button>
                </Link> */}
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
