import React from 'react';
import Link from 'next/link';

interface VideoCardProps {
  id: number;
  title: string;
  video_link: string; // URL video yang digunakan untuk iframe
}

export const VideoCard: React.FC<VideoCardProps> = ({ id, title, video_link }) => {
  return (
    <Link href={`/WatchVideo/${id}`} passHref>
      <div className="flex flex-col gap-3.5 items-center cursor-pointer relative">
        {/* Overlay div that will capture clicks */}
        <div className="absolute inset-0 z-10 w-full h-[220px] max-md:h-auto"></div>
        
        {/* iframe with pointer-events-none to make it unclickable */}
        <iframe
          src={video_link}
          title={title}
          className="w-full h-[220px] rounded-[30px] max-md:h-auto max-md:w-full pointer-events-none"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        <h2 className="text-xl leading-7 text-black max-sm:text-lg lg:text-2xl xl:text-4xl">{title}</h2>
      </div>
    </Link>
  );
};
