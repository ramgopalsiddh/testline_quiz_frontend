import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../services/api";
import Question from "../components/Question";
import Results from "../components/Results";

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuizData();
      if (data) setQuiz(data);
    };
    loadQuiz();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + parseFloat(quiz.correct_answer_marks));
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (!quiz) return <p>Loading...</p>;
  if (showResults) return <Results score={score} total={quiz.questions.length} />;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <Question question={quiz.questions[currentQuestion]} onAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;
