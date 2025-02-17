import React, { useState, useEffect, useCallback } from "react";
import quizData from "../utils/quizData";
import Lottie from "lottie-react";
import correctAnimation from "../assets/correct.json";
import incorrectAnimation from "../assets/incorrect.json";
import "../styles/Quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      setUserAnswer("");
      setShowFeedback(false);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion]);

  const handleAnswer = (selectedAnswer) => {
    const correct = selectedAnswer === quizData[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1500); // Show feedback for 1.5 seconds
  };

  useEffect(() => {
    if (timeLeft > 0 && !showScore && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, showScore, showFeedback, handleNextQuestion]);

  const timerClass =
    timeLeft > 15 ? "timer" : timeLeft > 5 ? "timer orange" : "timer red";

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          <h2>
            Your Score: {score} / {quizData.length}
          </h2>
          <p>
            {score === quizData.length
              ? "Perfect! 🎉"
              : "Good job! Keep practicing! 💪"}
          </p>
          <button
            className="restart-button"
            onClick={() => window.location.reload()}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <h2>{quizData[currentQuestion].question}</h2>
            <div className={timerClass}>Time Left: {timeLeft} seconds</div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="answer-section">
            {quizData[currentQuestion].type === "mcq" ? (
              quizData[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))
            ) : (
              <div className="integer-input">
                <input
                  type="number"
                  placeholder="Enter your answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                <button onClick={() => handleAnswer(parseInt(userAnswer))}>
                  Submit
                </button>
              </div>
            )}
          </div>
          {showFeedback && (
            <div className="feedback">
              <Lottie
                animationData={
                  isCorrect ? correctAnimation : incorrectAnimation
                }
                loop={false}
                style={{ height: 150 }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
