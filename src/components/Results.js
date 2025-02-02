import React from "react";
import "./Results.css";

const Results = ({ score, total, onRestart }) => {
  return (
    <div className="results-container">
      <h2 className="results-score">Your Score: {score} / {total}</h2>
      <button onClick={onRestart} className="restart-button">Restart</button>
    </div>
  );
};

export default Results;
