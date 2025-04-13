'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { VideoCard } from '@/components/VideoCard';
import { useParams } from 'next/navigation';

import React from 'react';

const videoData = [
    { id: 1, title: 'Judul Video 1', uploader: 'Uploader Video 1', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
    { id: 2, title: 'Judul Video 2', uploader: 'Uploader Video 2', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
    { id: 3, title: 'Judul Video 3', uploader: 'Uploader Video 3', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8819b79c2b055f6b97e15a4b4ef5d4f0e37618c4' },
    { id: 4, title: 'Judul Video 4', uploader: 'Uploader Video 4', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
    { id: 5, title: 'Judul Video 5', uploader: 'Uploader Video 5', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
    { id: 6, title: 'Judul Video 6', uploader: 'Uploader Video 6', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
    { id: 7, title: 'Judul Video 7', uploader: 'Uploader Video 7', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1e3afc0b78ef02b0beb0621c6b5ff12864414dc9' },
    { id: 8, title: 'Judul Video 8', uploader: 'Uploader Video 8', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1e3afc0b78ef02b0beb0621c6b5ff12864414dc9' },
    { id: 9, title: 'Judul Video 9', uploader: 'Uploader Video 9', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ce8c9c3998b0933c31020dd1b28849d4cc3003ca' },
  ];

export default function Home() {
    const { idVideo } = useParams();
    return (
        <div className="flex min-h-screen bg-orange-100">
            <Sidebar />
            <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[97px]">
                <Header />
                <div className="flex flex-col w-full">
                    <div className="w-full h-200 flex justify-center items-center">
                        <iframe className='bg-white w-300 h-180 rounded-2xl border border-black' 
                        src="https://www.youtube.com/embed/dt6SlDcMFsk"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>    
                    </div>   
                    <div className="flex flex-row gap-12 h-50 w-full items-center justify-center">
                        <Link href={`/WatchVideo/${idVideo}/quiz`}>
                        <button className='w-70 h-25 bg-green-800 rounded-2xl text-5xl'>QUIZ</button>
                        </Link>
                    </div>
                    <div className='py-20 px-40 flex flex-4 w-full flex-row gap-12 flex-wrap justify-center align-middle'>
                        {videoData.map((video) => (
                                <VideoCard key={video.id} {...video} />
                              ))}
                    </div> 
                </div> 
            </main>
        </div>
    );
  }
  