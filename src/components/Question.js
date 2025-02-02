import React from "react";
import Option from "../components/Option";
import "./Question.css";

const Question = ({ question, onAnswer, selectedOption, selectedOptionCorrect, questionNumber }) => {
  const readingMaterial = question.reading_material;

  return (
    <div className="question-container">
      {/* Display question number before description */}
      <h3 className="question-text">{`Question ${questionNumber}: ${question.description}`}</h3>
      
      {question.options.map((option, index) => {
        const isSelected = selectedOption === index;
        const isCorrect = option.is_correct;
        const isAnswerWrong = isSelected && !isCorrect;

        return (
          <Option
            key={option.id}
            option={option}
            onAnswer={onAnswer}
            isSelected={isSelected}
            isCorrect={isCorrect}
            isAnswerWrong={isAnswerWrong}
            optionIndex={index}
            isDisabled={selectedOption !== undefined}
          />
        );
      })}

      {selectedOptionCorrect === false && (
        <div className="feedback">
          <p className="incorrect-answer">Answer is Incorrect</p>
          <p className="correct-answer">The correct answer is: {question.options.find(option => option.is_correct)?.description}</p>
          
          {readingMaterial && readingMaterial.content_sections && readingMaterial.content_sections.length > 0 && (
            <div className="reading-material">
              <h4>Reading Material</h4>
              {readingMaterial.content_sections.map((section, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: section }} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
