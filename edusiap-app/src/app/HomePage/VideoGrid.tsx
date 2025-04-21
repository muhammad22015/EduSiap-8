import React, { useEffect, useState } from 'react';
import { VideoCard } from './VideoCard';

interface Video {
  video_id: number;
  title: string;
  video_link: string;
  thumbnail: string;
}

export const VideoGrid: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:5000/videos');
        const data = await response.json();
        console.log('API Response:', data);

        if (Array.isArray(data.response)) {
          setVideos(data.response);
        } else {
          console.warn('Data response bukan array:', data.response);
          setVideos([]); // fallback
        }
      } catch (error) {
        console.error('Gagal mengambil data video:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid gap-12 px-0 py-4 grid-cols-[repeat(3,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
      {videos.map((video) => (
        <VideoCard
          key={video.video_id}
          id={video.video_id}
          title={video.title}
          video_link={video.thumbnail} // pakai thumbnail sebagai gambar
        />
      ))}
    </div>
  );
};
