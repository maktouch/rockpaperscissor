import { Choice, choices, choicesArray } from "./choices";

export type Strategy = "random" | "tactical";
export type StrategyDetails = {
  label: string;
  key: Strategy;
  fn(lastMove?: Choice | null): Choice;
};

/**
 * Our RNG that simply returns a choice
 * @todo: Make this cryptographically secure with Crypto.getRandomValues()
 */

export function getRandomChoice(): Choice {
  const max = choicesArray.length;
  const pick = Math.floor(Math.random() * max);

  const choice = choicesArray[pick];

  return choice.key;
}

export const strategies: Record<Strategy, StrategyDetails> = {
  random: {
    label: "Random",
    key: "random",
    fn: () => getRandomChoice(),
  },
  tactical: {
    label: "Tactical",
    key: "tactical",
    fn: (lastMove: Choice | null) => {
      /* In the first round, there's no last move, so just generate something random */
      if (!lastMove) {
        return getRandomChoice();
      }

      return choices[lastMove].loses[0];
    },
  },
};

/**
 * Transform the choices into array so we can map it easily
 * We do this outside the react component for performance, so we don't need to use memoize
 */
export const strategiesArray: Array<StrategyDetails> = Object.values(
  strategies
);
