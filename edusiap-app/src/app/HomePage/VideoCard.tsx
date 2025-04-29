import React from 'react';
import Link from 'next/link';

interface VideoCardProps {
  id: number;
  title: string;
  video_link: string; // URL video yang digunakan untuk iframe
}

export const VideoCard: React.FC<VideoCardProps> = ({ id, title, video_link }) => {
  return (
    <Link href={`/WatchVideo/${id}`}>
      <div className="flex flex-col gap-3.5 items-center cursor-pointer">
        {/* Menggunakan iframe untuk menampilkan video */}
        <iframe
          src={video_link} // URL video di video_link akan dimasukkan ke dalam iframe
          title={title}
          className="w-full h-[230px] rounded-[30px] max-md:h-auto max-md:w-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h2 className="text-3xl leading-7 text-black max-sm:text-2xl">{title}</h2>
      </div>
    </Link>
  );
};
