import React from "react";
import { ScreenProps } from "./App";
import { choicesArray, choices } from "./choices";

export default function Game({ state, dispatch }: ScreenProps) {
  const {
    bestOf,
    firstTo,
    userScore,
    cpuScore,
    status,
    lastRoundWinner,
    userChoice,
    cpuChoice,
    gameWinner,
  } = state;

  return (
    <div>
      <p>
        Best of <strong>{bestOf}</strong> (first to reach{" "}
        <strong>{firstTo}</strong>)
      </p>

      <p>
        Your score: <strong>{userScore}</strong>
      </p>
      <p>
        Computer's score: <strong>{cpuScore}</strong>
      </p>

      {status === "in-progress" && (
        <div style={{ marginTop: "2rem" }}>
          {choicesArray.map((choice) => (
            <button
              key={choice.key}
              onClick={(e) =>
                dispatch({ type: "user:choice", choice: choice.key })
              }
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}

      {lastRoundWinner && (
        <div style={{ marginTop: "2rem" }}>
          {userChoice && (
            <div>
              You chose: <strong>{choices[userChoice].label}</strong>
            </div>
          )}
          {cpuChoice && (
            <div>
              CPU chose: <strong>{choices[cpuChoice].label}</strong>
            </div>
          )}
          <div>
            Winner: <strong>{lastRoundWinner}</strong>{" "}
          </div>
        </div>
      )}

      {status === "ended" && (
        <div>
          <h3>
            Grand winner: <strong>{gameWinner}</strong>
          </h3>

          <button onClick={(e) => dispatch({ type: "replay" })}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
