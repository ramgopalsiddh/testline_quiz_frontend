import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../services/api";
import Question from "../components/Question";
import Results from "../components/Results";

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuizData();
      if (data) setQuiz(data);
    };
    loadQuiz();
  }, []);

  const handleAnswer = (isCorrect, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);

    if (!answeredQuestions.includes(currentQuestion)) {
      if (isCorrect) {
        setScore(score + parseFloat(quiz.correct_answer_marks));
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedOptions([]);
    setAnsweredQuestions([]);
  };

  if (!quiz) return <p>Loading...</p>;
  if (showResults) return <Results score={score} total={quiz.questions.length} onRestart={handleRestart} />;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <Question
        question={quiz.questions[currentQuestion]}
        onAnswer={handleAnswer}
        selectedOption={selectedOptions[currentQuestion]}
      />

      <div>
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={selectedOptions[currentQuestion] === undefined}>
          {currentQuestion === quiz.questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
