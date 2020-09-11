import { useReducer } from "react";
import { strategiesArray, Strategy, strategies } from "./strategies";
import { getFirstToScore, getWinner } from "./game-logic";
import { Choice } from "./choices";

const defaultStrategy = strategiesArray[0].key;

export type GameStatus = "begin" | "in-progress" | "ended";

export type GameState = {
  status: GameStatus;
  bestOf: number;
  firstTo: number;
  strategy: Strategy;
  cpuChoice: Choice | null;
  userChoice: Choice | null;
  lastRoundWinner: "user" | "cpu" | "tie" | null;
  gameWinner: "user" | "cpu" | "tie" | null;
  userScore: number;
  cpuScore: number;
};

export type GameAction =
  | { type: "replay" }
  | { type: "modify:status"; status: GameStatus }
  | { type: "modify:bestOf"; bestOf: number }
  | { type: "modify:strategy"; strategy: Strategy }
  | { type: "user:choice"; choice: Choice };

export const initialState = {
  status: "begin" as GameStatus,
  bestOf: 3,
  firstTo: 2, // precalculated
  strategy: defaultStrategy,
  cpuChoice: null,
  userChoice: null,
  lastRoundWinner: null,
  gameWinner: null,
  userScore: 0,
  cpuScore: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "replay": {
      return {
        ...initialState,
        bestOf: state.bestOf,
        firstTo: state.firstTo,
        strategy: state.strategy,
      };
    }

    /**
     * Change the general state of the game
     */
    case "modify:status": {
      return { ...state, status: action.status };
    }

    /**
     * If the length of the game is changed, calculte what's the breakoff score at the same time
     */
    case "modify:bestOf": {
      return {
        ...state,
        bestOf: action.bestOf,
        firstTo: getFirstToScore(action.bestOf),
      };
    }

    /**
     * Choose the strategy here
     */
    case "modify:strategy": {
      return {
        ...state,
        strategy: action.strategy,
      };
    }

    /**
     * This is the core logic part of the game
     * As soon as the user makes it choice, we're going to compute the cpu's choice
     * And determine who's winning
     */
    case "user:choice": {
      const userChoice = action.choice;

      // we're going to generate a choice based on the strategy
      const cpuChoice = strategies[state.strategy].fn(state.cpuChoice);

      const winner = getWinner(userChoice, cpuChoice);

      // we're going to keep the last round winner so we can display who won the last hand
      const lastRoundWinner = (function () {
        if (winner === "A") {
          return "user";
        } else if (winner === "B") {
          return "cpu";
        } else {
          return "tie";
        }
      })();

      // score bookkeeping
      const userScore =
        lastRoundWinner === "user" ? state.userScore + 1 : state.userScore;
      const cpuScore =
        lastRoundWinner === "cpu" ? state.cpuScore + 1 : state.cpuScore;

      // We're going to check right away if the game has ended
      const gameWinner = (function () {
        if (userScore >= state.firstTo || cpuScore >= state.firstTo) {
          if (userScore >= state.firstTo) {
            return "user";
          } else if (cpuScore >= state.firstTo) {
            return "cpu";

            // this should never happen because it's first-to-reach
          } else {
            return "tie";
          }
        } else {
          return null;
        }
      })();

      // if there's a winner, it means the game has ended
      const status = gameWinner ? "ended" : state.status;

      return {
        ...state,
        userChoice,
        cpuChoice,
        lastRoundWinner,
        userScore,
        cpuScore,
        gameWinner,
        status,
      };
    }

    default:
      return state;
  }
}

export function useGameReducer() {
  return useReducer(gameReducer, initialState);
}
