import { mockVideos } from "@/types/video";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function WatchPage({ params }: { params: { videoId: string } }) {
  const video = mockVideos.find((v) => v.id === params.videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-14 pl-16 md:pl-56">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
                {/* Video player would go here */}
                <div className="w-full h-full flex items-center justify-center text-white">
                  Video Player (Would be embedded here)
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-xl font-bold">{video.title}</h1>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                      <img
                        src={video.channelIcon}
                        alt={video.channel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{video.channel}</p>
                      <p className="text-gray-600 text-sm">
                        {video.subscribers}
                      </p>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
                      Subscribe
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                      <span className="mr-2">👍</span>
                      {video.likes}
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                      <span className="mr-2">👎</span>
                      {video.dislikes}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  <span className="font-medium mr-2">
                    {video.views} • {video.timestamp}
                  </span>
                </div>
                <p className="mt-2">{video.description}</p>
              </div>
            </div>
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="text-lg font-medium mb-4">Recommended</h2>
              <div className="space-y-4">
                {mockVideos
                  .filter((v) => v.id !== video.id)
                  .slice(0, 5)
                  .map((v) => (
                    <div key={v.id} className="flex">
                      <div className="w-40 h-24 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={v.thumbnail}
                          alt={v.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {v.title}
                        </h3>
                        <p className="text-gray-600 text-xs mt-1">
                          {v.channel}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {v.views} • {v.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}