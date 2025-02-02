import React from "react";
import Option from "../components/Option";

const Question = ({ question, onAnswer, selectedOption }) => {
  return (
    <div>
      <h3>{question.description}</h3>
      {question.options.map((option, index) => (
        <Option
          key={option.id}
          option={option}
          onAnswer={onAnswer}
          isSelected={selectedOption === index}
          optionIndex={index}
        />
      ))}
    </div>
  );
};

export default Question;
