'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Gunakan useParams untuk mengambil parameter dari URL

interface Answer {
  answer_id: number;
  answer: string;
  is_correct: boolean;
}

interface Question {
  question_id: number;
  title: string;
  position: number;
  answers: Answer[];
}

interface Quiz {
  quiz_id: number;
  video_id: number;
  title: string;
  question: Question[];
}

const QuizPage = () => {
  const { idVideo } = useParams(); 
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, number>>(new Map());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (idVideo) {
      const fetchQuiz = async () => {
        try {
          const response = await fetch(`http://localhost:5000/quiz/${idVideo}`);
          const data = await response.json();
          if (data.status === 'Authorized') {
            setQuiz(data.response);
          } else {
            console.error('Quiz not found');
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
        }
      };

      fetchQuiz();
    }
  }, [idVideo]);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => new Map(prev).set(questionId, answerId));
  };

  const handleSubmit = () => {
    if (quiz) {
      let correctAnswers = 0;
      quiz.question.forEach((question) => {
        const selectedAnswerId = selectedAnswers.get(question.question_id);
        if (selectedAnswerId) {
          const selectedAnswer = question.answers.find(
            (answer) => answer.answer_id === selectedAnswerId
          );
          if (selectedAnswer?.is_correct) {
            correctAnswers++;
          }
        }
      });

      setScore(correctAnswers);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="quiz-container">
      <h1>{quiz ? quiz.title : 'Loading quiz...'}</h1>
      {quiz ? (
        <div className="questions">
          {quiz.question.map((question) => (
            <div key={question.question_id} className="question">
              <h2>{question.title}</h2>
              <div className="answers">
                {question.answers.map((answer) => (
                  <div key={answer.answer_id} className="answer-option">
                    <input
                      type="radio"
                      id={`answer-${answer.answer_id}`}
                      name={`question-${question.question_id}`}
                      value={answer.answer_id}
                      onChange={() => handleAnswerSelect(question.question_id, answer.answer_id)}
                    />
                    <label htmlFor={`answer-${answer.answer_id}`}>{answer.answer}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="submit-button">Submit Quiz</button>
        </div>
      ) : (
        <p>Loading quiz data...</p>
      )}

      {isSubmitted && (
        <div className="result">
          <h3>Quiz Completed!</h3>
          <p>Your score: {score} / {quiz?.question.length}</p>
        </div>
      )}

      <style jsx>{`
        .quiz-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center; /* Menambahkan text-align untuk membuat tulisan menjadi rata tengah */
        }

        h1, h2, h3, p {
          color: black; /* Membuat semua teks menjadi hitam */
        }

        .questions {
          margin-top: 20px;
        }

        .question {
          margin-bottom: 20px;
        }

        .answers {
          margin-top: 10px;
        }

        .answer-option {
          margin-bottom: 10px;
        }

        .submit-button {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .submit-button:hover {
          background-color: #45a049;
        }

        .result {
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
