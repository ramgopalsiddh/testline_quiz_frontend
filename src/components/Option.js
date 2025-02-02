import React from "react";

const Option = ({ option, onAnswer, isSelected, optionIndex }) => {
  const handleClick = () => {
    onAnswer(option.is_correct, optionIndex);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isSelected ? "lightblue" : "white",
      }}
    >
      {option.description}
    </button>
  );
};

export default Option;
