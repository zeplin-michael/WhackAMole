import { useMoleGame } from "../context/GameContext";
import React from "react";
// import { useScore } from "../context/GameContext";
import "../index.css";

export default function MoleContainer() {
  const {
    isPlaying,
    molePosition,
    score,
    countdown,
    startGame,
    restartGame,
    hitMole,
    highScores,
  } = useMoleGame();

  // const { highScores } = useScore();

  return (
    <>
      {isPlaying ? (
        <>
          <div className="root">
            <h1>Whack a Mole</h1>
            <div className="scoreboard">
              <p>Score: {score}</p>
              <p>Timer: {countdown}</p>
              <button onClick={restartGame}>Restart</button>
            </div>
          </div>
          <div className="gridStyle">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div
                className="cellStyle"
                key={idx}
                onClick={idx === molePosition ? hitMole : undefined}
              >
                {idx === molePosition ? (
                  <img src="/mole.png" alt="mole" className="mole" />
                ) : (
                  <img src="/hole.png" alt="hole" className="hole" />
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="root">
          <h1>Whack a Mole</h1>
          <section className="welcome">
            <p>Welcome to Whack a Mole!</p>
            <p>Whack a mole to earn points.</p>
            <p>How many can you get?</p>
          </section>
          <button onClick={startGame}>Play</button>
          <section className="highscores">
            <h2>High Scores</h2>
            <ul>
              {highScores.length === 0 ? (
                <li>None yet... Play the game!</li>
              ) : (
                highScores.map((entry, idx) => <li key={idx}>{entry.score}</li>)
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
