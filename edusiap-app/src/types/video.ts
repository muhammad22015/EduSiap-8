export interface Video {
    id: string;
    title: string;
    channel: string;
    views: string;
    timestamp: string;
    thumbnail: string;
    channelIcon: string;
    duration: string;
    description?: string;
    likes?: string;
    dislikes?: string;
    subscribers?: string;
  }
  
  export const mockVideos: Video[] = [
    {
      id: "1",
      title: "Building a YouTube Clone with Next.js",
      channel: "Code With Me",
      views: "120K views",
      timestamp: "3 days ago",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      channelIcon: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-x1t1Wp-kmJqXgX3VXk3X7X1QzQ5Z5Z5Z5Q=s176-c-k-c0x00ffffff-no-rj",
      duration: "10:30",
      description: "In this video, we'll build a YouTube clone with Next.js, React, and Tailwind CSS.",
      likes: "10K",
      dislikes: "100",
      subscribers: "1M subscribers",
    },
    {
      id: "2",
      title: "Learn React in 30 Minutes",
      channel: "React Masters",
      views: "500K views",
      timestamp: "1 week ago",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      channelIcon: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-x1t1Wp-kmJqXgX3VXk3X7X1QzQ5Z5Z5Z5Q=s176-c-k-c0x00ffffff-no-rj",
      duration: "30:00",
    },
    // Add more mock videos as needed
  ];