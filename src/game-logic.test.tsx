import { getWinner, getFirstToScore } from "./game-logic";

test("test game logic", () => {
  expect(getWinner("rock", "paper")).toBe("B");
  expect(getWinner("rock", "scissor")).toBe("A");
  expect(getWinner("rock", "rock")).toBeNull();

  expect(getWinner("paper", "paper")).toBeNull();
  expect(getWinner("paper", "scissor")).toBe("B");
  expect(getWinner("paper", "rock")).toBe("A");

  expect(getWinner("scissor", "paper")).toBe("A");
  expect(getWinner("scissor", "scissor")).toBeNull();
  expect(getWinner("scissor", "rock")).toBe("B");
});

test("test 'first to' score", () => {
  expect(getFirstToScore(3)).toBe(2);
  expect(getFirstToScore(4)).toBe(3);
  expect(getFirstToScore(5)).toBe(3);
  expect(getFirstToScore(6)).toBe(4);
});
