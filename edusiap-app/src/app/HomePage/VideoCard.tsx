import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface VideoCardProps {
  id: number;
  title: string;
  video_link: string;
  thumbnail: string; // URL of the thumbnail image
}

export const VideoCard: React.FC<VideoCardProps> = ({ id, title, thumbnail }) => {
  return (
    <Link href={`/WatchVideo/${id}`} passHref>
      <div className="flex flex-col gap-3.5 items-center cursor-pointer relative">
        {/* Overlay div that will capture clicks */}
        <div className="absolute inset-0 z-10 w-full h-[220px] max-md:h-auto"></div>
        
        {/* Image thumbnail */}
        <div className="w-full h-[220px] rounded-[30px] max-md:h-auto max-md:w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            width={400}  // Set appropriate width
            height={220} // Set appropriate height
            className="w-full h-full object-cover"
            unoptimized={true} // Remove this if you want Next.js to optimize the image
          />
        </div>
        
        <h2 className="text-xl leading-7 text-black max-sm:text-xl   lg:text-2xl xl:text-2xl">{title}</h2>
      </div>
    </Link>
  );
};