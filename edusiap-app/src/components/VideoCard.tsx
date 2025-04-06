import Link from "next/link";
import Image from "next/image";

type VideoCardProps = {
  id: string;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  thumbnail: string;
  channelIcon: string;
  duration: string;
};

export default function VideoCard({
  id,
  title,
  channel,
  views,
  timestamp,
  thumbnail,
  channelIcon,
  duration,
}: VideoCardProps) {
  return (
    <Link href={`/watch/${id}`} className="w-full">
      <div className="flex flex-col mb-8">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
            {duration}
          </span>
        </div>
        <div className="flex mt-3">
          <div className="flex-shrink-0 mr-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={channelIcon}
                alt={channel}
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
            <p className="text-gray-600 text-xs mt-1">{channel}</p>
            <p className="text-gray-600 text-xs">
              {views} • {timestamp}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}