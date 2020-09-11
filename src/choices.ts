/**
 * These are the available "choices"
 * We put them into object so we can one day use intl on the label without changing logic
 * And we add what the choice win, ties, loses againsts just in case we want to do another variant
 * like rock-paper-scissors-lizard-spock
 */

export type Choice = "rock" | "paper" | "scissor";

export type ChoiceDetails = {
  label: string;
  key: Choice;
  beats: Array<Choice>;
  loses: Array<Choice>;
  ties: Array<Choice>;
};

export const choices: Record<Choice, ChoiceDetails> = {
  rock: {
    label: "Rock",
    key: "rock",
    beats: ["scissor"],
    loses: ["paper"],
    ties: ["rock"],
  },
  paper: {
    label: "Paper",
    key: "paper",
    beats: ["rock"],
    loses: ["scissor"],
    ties: ["paper"],
  },
  scissor: {
    label: "Scissor",
    key: "scissor",
    beats: ["paper"],
    loses: ["rock"],
    ties: ["scissor"],
  },
};

/**
 * Transform the choices into array so we can map it easily
 * We do this outside the react component for performance, so we don't need to use memoize
 */
export const choicesArray: Array<ChoiceDetails> = Object.values(choices);
