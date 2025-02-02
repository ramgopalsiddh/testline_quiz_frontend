import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../services/api";
import Question from "../components/Question";
import Results from "../components/Results";
import "./Quiz.css";

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
    if (answeredQuestions.includes(currentQuestion)) return;
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = { optionIndex, isCorrect };
    setSelectedOptions(updatedSelectedOptions);

    if (isCorrect) {
      const marks = parseFloat(quiz.correct_answer_marks); 
      setScore(score + marks);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
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

  const totalMarks = quiz.questions.length * parseFloat(quiz.correct_answer_marks);

  if (showResults) {
    return <Results score={score} total={totalMarks} onRestart={handleRestart} />;
  }

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz Title : {quiz.title}</h2>
      
      <Question
        question={quiz.questions[currentQuestion]}
        onAnswer={handleAnswer}
        selectedOption={selectedOptions[currentQuestion]?.optionIndex}
        selectedOptionCorrect={selectedOptions[currentQuestion]?.isCorrect}
        questionNumber={currentQuestion + 1}
      />

      <div className="quiz-controls">
        <button 
          onClick={handleNext} 
          disabled={selectedOptions[currentQuestion] === undefined} 
          className="next-button"
        >
          {currentQuestion === quiz.questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
      <p className="score-display">Score: {score} / {totalMarks}</p>
    </div>
  );
};

export default Quiz;
