import React from "react";

import { useGameReducer, GameState, GameAction } from "./reducer";
import { strategiesArray, Strategy } from "./strategies";
import Game from "./Game";

export type ScreenProps = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};

function App() {
  const [state, dispatch] = useGameReducer();

  const { status, bestOf, strategy } = state;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock, Paper, Scissors!</h1>
      </header>

      {status === "begin" && (
        <div>
          <p>Choose your opponent's strategy</p>
          <div>
            {strategiesArray.map((strat) => (
              <label key={strat.key}>
                <input
                  type="radio"
                  value={strat.key}
                  checked={strategy === strat.key}
                  onChange={(e) => {
                    dispatch({
                      type: "modify:strategy",
                      strategy: e.target.value as Strategy,
                    });
                  }}
                />
                {strat.label}
              </label>
            ))}
          </div>
          <p>Choose your game's length</p>
          <input
            type="range"
            step="2"
            min="1"
            max="11"
            value={bestOf}
            onChange={(e) => {
              dispatch({
                type: "modify:bestOf",
                bestOf: Number(e.target.value),
              });
            }}
          />
          <span>Best of {bestOf}</span>

          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={(e) =>
                dispatch({
                  type: "modify:status",
                  status: "in-progress",
                })
              }
            >
              Start game
            </button>
          </div>
        </div>
      )}

      {status !== "begin" && <Game state={state} dispatch={dispatch} />}
    </div>
  );
}

export default App;
