import React from "react";
import "./Option.css";

const Option = ({ option, onAnswer, isSelected, isCorrect, isAnswerWrong, optionIndex, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onAnswer(isCorrect, optionIndex);
    }
  };

  const buttonClass = isSelected
    ? isCorrect
      ? "correct-option"
      : "incorrect-option"
    : "";

  return (
    <button
      onClick={handleClick}
      className={`${buttonClass} ${isDisabled ? "disabled-option" : ""}`}
      disabled={isDisabled}
    >
      {option.description}
    </button>
  );
};

export default Option;
