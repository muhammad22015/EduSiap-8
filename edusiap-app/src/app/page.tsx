// app/HomePage/page.tsx
import { VideoGallery } from './HomePage/VideoGallery';

interface HomePageProps {
  searchParams: { q?: string };
}

export default function HomePage({ searchParams }: HomePageProps) {
  return <VideoGallery initialSearchQuery={searchParams.q || ''} />;
}