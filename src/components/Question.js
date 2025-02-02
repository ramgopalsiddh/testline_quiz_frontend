import React from "react";
import Option from "../components/Option";

const Question = ({ question, onAnswer, selectedOption, selectedOptionCorrect }) => {
  // Extract reading material
  const readingMaterial = question.reading_material;

  return (
    <div>
      <h3>{question.description}</h3>
      
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
            isDisabled={selectedOption !== undefined} // Disable option if selected
          />
        );
      })}

      {selectedOptionCorrect === false && (
        <div className="feedback">
          <p style={{ color: 'red' }}>Incorrect. The correct answer is:</p>
          <p>{question.options.find(option => option.is_correct)?.description}</p>
          
          {readingMaterial && readingMaterial.content_sections && readingMaterial.content_sections.length > 0 && (
            <div className="reading-material">
              <h4>Reading Material</h4>
              {readingMaterial.content_sections.map((section, index) => (
                <div 
                  key={index} 
                  dangerouslySetInnerHTML={{ __html: section }} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
