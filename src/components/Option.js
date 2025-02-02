import React from "react";

const Option = ({ option, onAnswer }) => {
  return (
    <button onClick={() => onAnswer(option.is_correct)}>
      {option.description}
    </button>
  );
};

export default Option;
