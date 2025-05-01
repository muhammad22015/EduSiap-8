// app/HomePage/VideoGallery.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { VideoGrid } from './VideoGrid';
import { useSearchParams } from 'next/navigation';

interface VideoGalleryProps {
  initialSearchQuery?: string;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ 
  initialSearchQuery = '' 
}) => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  // Sync with URL changes
  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="ml-[120px] flex-1 px-20 py-0 max-md:px-5 max-md:py-0 max-sm:ml-0">
        <Header initialSearch={searchQuery} />
        <VideoGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
};