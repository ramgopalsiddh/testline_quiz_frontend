import React from "react";

const Option = ({ option, onAnswer, isSelected, isCorrect, isAnswerWrong, optionIndex, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onAnswer(isCorrect, optionIndex);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isSelected ? (isCorrect ? "green" : "red") : "white",
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      {option.description}
    </button>
  );
};

export default Option;
