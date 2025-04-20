import React from 'react';
import Link from 'next/link';

interface VideoCardProps {
  id?: number;
  title: string;
  uploader?: string;
  video_link: string; // bisa thumbnail
}

export const VideoCard: React.FC<VideoCardProps> = ({ id, title, video_link }) => {
  return (
    <Link href={`/WatchVideo/${id}`}>
      <div className="flex flex-col gap-3.5 items-center cursor-pointer">
        <img
          src={video_link}
          alt={`${title} thumbnail`}
          className="h-[230px] rounded-[30px] w-[402px] max-md:w-full max-md:h-auto"
        />
        <h2 className="text-3xl leading-7 text-black max-sm:text-2xl">{title}</h2>
      </div>
    </Link>
  );
};
