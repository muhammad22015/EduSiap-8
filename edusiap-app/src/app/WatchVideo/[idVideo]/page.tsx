'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getQuizScore } from '@/lib/api'; // Make sure to import your API function

interface Video {
  video_id: number;
  title: string;
  video_link: string;
}

interface QuizScoreResponse {
  status: string;
  response: {
    user_id: number;
    quiz_id: number;
    score: number;
  } | null;
}

export default function WatchVideoPage() {
  const { idVideo } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/videos?id=${idVideo}`);
        const data = await res.json();

        if (data.status === 'Authorized') {
          setVideo(data.response[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [idVideo]);

 useEffect(() => {
  const fetchQuizScore = async () => {
    if (!idVideo) return;

    console.log('Debug fetchQuizScore:');
    console.log('idVideo:', idVideo);
    console.log('idVideo type:', typeof idVideo);
    console.log('Parsed idVideo:', Number(idVideo));

    setScoreLoading(true);
    setScoreError(null);

    try {
      const response: QuizScoreResponse = await getQuizScore(Number(idVideo));
      console.log('Quiz score response:', response);
      
      if (response.status === "Authorized" && response.response) {
        setQuizScore(response.response.score);
      } else {
        setQuizScore(null);
      }
    } catch (error: unknown) {
      console.error('Failed to fetch quiz score:', error);
      let errorMessage = 'Failed to load quiz score';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setScoreError(errorMessage);
      setQuizScore(null);
    } finally {
      setScoreLoading(false);
    }
  };

  fetchQuizScore();
}, [idVideo]);

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Doodle Background Sedikit Lebih Kecil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/doodle.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '110% auto',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>

      <Sidebar />
      <main className="flex-1 py-0 max-max-xl:px-5 max-max-xl:py-0 ml-[120px] mt-[120px] mb-[30px] max-sm:ml-0 relative z-10">
        <Header />
        <div className="flex flex-col w-full items-center justify-center">
          {loading ? (
            <p className="text-center text-xl text-gray-600 mt-20">Loading video...</p>
          ) : video ? (
            <>
              <div className="w-full max-w-6xl flex justify-center items-center mb-6 relative">
                {/* Box background putih transparan di belakang video */}
                <div className="absolute w-full h-full bg-white opacity-60 rounded-2xl z-0" />
                <iframe
                  className="bg-white w-full h-[600px] rounded-2xl border border-black max-sm:h-50 max-xl:h-80 max-xl:w-4/5 relative z-10"
                  src={video.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h1 className="text-3xl font-bold text-black mt-6 px-10 max-sm:text-lg max-sm:mt-0 max-sm:px-5 max-xl:text-2xl">
                {video.title}
              </h1>

              {/* Display quiz score if available */}
              <div className="w-full max-w-6xl bg-white bg-opacity-80 rounded-xl p-6 mb-6 shadow-lg">
                {scoreLoading ? (
                  <div className="text-center text-xl text-gray-600">Loading your quiz score...</div>
                ) : scoreError ? (
                  <div className="text-center text-xl text-red-600">{scoreError}</div>
                ) : quizScore !== null ? (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Your Quiz Result</h2>
                    <div className="text-4xl font-bold text-green-600 mb-4">{quizScore}/100</div>
                    <p className="text-lg text-gray-700">
                      {quizScore >= 80 ? 'Excellent! 🎉' :
                        quizScore >= 60 ? 'Good job! 👍' :
                          'Keep practicing! 💪'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-xl text-gray-600">
                    No quiz score yet. Complete the quiz to see your result!
                  </div>
                )}
              </div>


              <div className="flex flex-row gap-8 h-16 w-full items-center justify-center mt-6 max-sm:mt-0">
                <Link href={`/WatchVideo/${idVideo}/quiz`}>
                  <button className="w-48 h-14 bg-green-800 rounded-2xl text-2xl text-white 
                max-xl:w-32 max-xl:h-12 max-xl:text-xl 
                max-sm:text-lg max-sm:w-24 max-sm:h-8
                transition-transform duration-300 ease-in-out transform 
                hover:scale-110 hover:shadow-2xl">
                    QUIZ
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-xl text-gray-600 mt-20">Video not found.</p>
          )}
        </div>
      </main>
    </div>
  );
}