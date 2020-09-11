import { Choice, choices } from "./choices";

export type Winner = "A" | "B" | null;

export function getWinner(A: Choice, B: Choice): Winner {
  if (choices[A].ties.includes(B)) {
    return null;
  }

  if (choices[A].beats.includes(B)) {
    return "A";
  }

  if (choices[B].beats.includes(A)) {
    return "B";
  }

  return null;
}

export function getFirstToScore(rounds: number) {
  return Math.floor(rounds / 2) + 1;
}
