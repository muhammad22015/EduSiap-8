import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { VideoGrid } from './VideoGrid';

export const VideoGallery: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 px-20 py-0 max-md:px-5 max-md:py-0">
        <Header />
        <VideoGrid />
      </main>
    </div>
  );
};