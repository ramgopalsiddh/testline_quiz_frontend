import React from "react";
import Option from "../components/Option";

const Question = ({ question, onAnswer }) => {
  return (
    <div>
      <h3>{question.description}</h3>
      {question.options.map((option) => (
        <Option key={option.id} option={option} onAnswer={onAnswer} />
      ))}
    </div>
  );
};

export default Question;
