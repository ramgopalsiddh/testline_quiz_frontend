import React from "react";

const Results = ({ score, total, onRestart }) => {
  return (
    <div>
      <h2>Your Score: {score} / {total}</h2>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default Results;
