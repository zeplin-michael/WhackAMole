import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const GameContext = createContext();

export function useMoleGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [molePosition, setMolePosition] = useState(null);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState(() => {
    const stored = localStorage.getItem("highScores");
    return stored ? JSON.parse(stored) : [];
  });
  const [countdown, setCountdown] = useState(5);
  const [timerId, setTimerId] = useState(null);

  const randomMole = () => Math.floor(Math.random() * 9);

  const updateHighScore = (newScore) => {
    const newEntry = { score: newScore };

    const updatedScores = [...highScores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setHighScores(updatedScores);
    localStorage.setItem("highScores", JSON.stringify(updatedScores));
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCountdown(15);
    setMolePosition(randomMole());
  };

  const restartGame = () => {
    if (timerId) clearInterval(timerId);
    setIsPlaying(false);
    setCountdown(15);
    setScore(0);
    setMolePosition(null);
  };

  const hitMole = () => {
    setScore((prev) => prev + 1);
    setMolePosition(randomMole());
  };

  useEffect(() => {
    if (!isPlaying) return;

    const intervalID = setInterval(() => {
      //   score += 1;
      setScore((prevScore) => prevScore);
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalID);
          setIsPlaying(false);
          // updateHighScore(currentScore);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isPlaying]);

  //     const intervalID = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(intervalID);
  //           setIsPlaying(false);
  //           updateHighScore(score);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     setTimerId(intervalID);
  //   };

  useEffect(() => {
    if (performance.navigation.type === 1) {
      localStorage.removeItem("highScores");
      setHighScores([]);
    }
  }, []);

  //   const updateHighScore = (newScore) => {
  //     const newEntry = { score: newScore };

  //     const updatedScores = [...highScores, newEntry]
  //       .sort((a, b) => b.score - a.score)
  //       .slice(0, 5);

  //     setHighScores(updatedScores);
  //     localStorage.setItem("highScores", JSON.stringify(updatedScores));
  //   };

  useEffect(() => {
    if (!isPlaying && countdown === 0) {
      updateHighScore(score);
    }
  }, [isPlaying, countdown, score]);

  //   const restartGame = () => {
  //     if (timerId) clearInterval(timerId);
  //     setIsPlaying(false);
  //     setCountdown(15);
  //     setScore(0);
  //     setMolePosition(null);
  //   };

  //   const hitMole = () => {
  //     setScore((prev) => prev + 1);
  //     setMolePosition(randomMole());
  //   };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        molePosition,
        score,
        highScores,
        countdown,
        startGame,
        restartGame,
        hitMole,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
