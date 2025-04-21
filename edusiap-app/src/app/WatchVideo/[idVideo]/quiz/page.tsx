'use client';
import Link from 'next/link';
import ArrowIcon from '@/components/ArrowIcon';
import { useState, useEffect } from 'react';

// Define types for your quiz data
type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  type?: 'multiple-choice' | 'true-false' | 'multiple-answer';
};

const QuizPage = ({ videoId }: { videoId: number }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10);

  // Color palette for options
  const OPTION_COLORS = [
    'bg-[#FF0000]',  // Red
    'bg-[#5EFF00]',  // Green
    'bg-[#FFFF00]',  // Yellow
    'bg-[#0090FF]',  // Blue
  ];

  useEffect(() => {
    // Fetch quiz data based on videoId
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/quiz/${videoId}`);
        const data = await response.json();

        if (data.status === 'Authorized') {
          const quiz = data.response;
          const formattedQuizData = quiz.question.map((question: any) => ({
            id: question.id,
            question: question.question,
            options: question.answers.map((answer: any) => answer.text), // Assuming answers have a text property
            correctAnswer: question.correct_answer, // Assuming the quiz object has the correct answer
            points: question.points,
            type: question.type,
          }));

          setQuizData(formattedQuizData);
        } else {
          console.error('Quiz not found');
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [videoId]);

  const handleOptionSelect = (option: string): void => {
    if (showResult) return;

    setSelectedOption(option);
    setShowResult(true);

    if (option === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + quizData[currentQuestionIndex].points);
    }
  };

  const handleNextQuestion = (): void => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(10);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    const totalPossibleScore = quizData.reduce((total, q) => total + q.points, 0);
    const percentageScore = Math.round((score / totalPossibleScore) * 100);

    const correctAnswers = quizData.filter(q =>
      q.correctAnswer === selectedOption
    ).length;

    const totalQuestions = quizData.length;

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const correctPercentage = (correctAnswers / totalQuestions) * 100;
    const correctOffset = circumference - (correctPercentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-quiz">
        <Link href="../page.tsx">
          <ArrowIcon />
        </Link>
        <div className="bg-[#303030] p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Quiz Completed!</h1>

          {/* Score Display (out of 100) */}
          <div className="text-5xl font-bold mb-6">
            <span className="text-blue-500">{percentageScore}</span>
            <span className="text-gray-200">/100</span>
          </div>

          {/* Pie Chart Visualization */}
          <div className="flex justify-center my-8">
            <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#e5e7eb" // Gray background
                strokeWidth="40"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#10B981" // Green for correct
                strokeWidth="40"
                strokeDasharray={circumference}
                strokeDashoffset={correctOffset}
              />
            </svg>
          </div>

          {/* Detailed Score Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-bold">Correct</p>
              <p className="text-black text-2xl">{correctAnswers}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 font-bold">Incorrect</p>
              <p className="text-black text-2xl">{totalQuestions - correctAnswers}</p>
            </div>
          </div>

          {/* Original Score Display */}
          <p className="text-xl text-gray-400 mb-4">
            Raw score: {score}/{totalPossibleScore} points
          </p>

          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setSelectedOption(null);
              setShowResult(false);
              setQuizCompleted(false);
            }}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-quiz relative">
      {showResult && (
        <div className="fixed inset-0 bg-[#404040]/80 flex items-center justify-center z-50">
          <div className="bg-[#222222] p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              {selectedOption === quizData[currentQuestionIndex].correctAnswer ? (
                <div className="text-green-400 font-bold text-3xl mb-4">✅ Correct!</div>
              ) : (
                <div className="text-red-400 font-bold text-3xl mb-4">❌ Incorrect</div>
              )}
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl w-full"
              >
                {currentQuestionIndex === quizData.length - 1 ? 'See Final Results' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col bg-[#222222]/90 rounded-lg shadow-lg max-w-5/6 w-full">
        <span className="absolute top-40 left-1/2 transform -translate-x-1/2 flex justify-center items-center p-4 border border-black bg-[#010101] rounded-full w-36 self-center text-4xl text-white">
          {currentQuestionIndex + 1}/{quizData.length}
        </span>
        <h2 className="w-full min-h-100 text-center mt-24 text-4xl mb-6 text-white">
          {quizData.length > 0 && quizData[currentQuestionIndex]
            ? quizData[currentQuestionIndex].question
            : 'Loading...'}
        </h2>


        <div className="flex w-full">
          {quizData.length > 0 && quizData[currentQuestionIndex] && quizData[currentQuestionIndex].options ? (
            quizData[currentQuestionIndex].options.map((option, index) => {
              const isCorrect = option === quizData[currentQuestionIndex].correctAnswer;
              const isSelected = option === selectedOption;
              const isWrongSelected = isSelected && !isCorrect;
              return (
                <div key={index}>
                  {/* Render each option */}
                </div>
              );
            })
          ) : (
            <p>Loading options...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default QuizPage;
