import { strategies } from "./strategies";
import { choices } from "./choices";

test("random: correctly generate random choice", () => {
  const allChoices = Object.keys(choices);

  for (let i = 0; i < 30; i++) {
    const res = strategies.random.fn();
    expect(allChoices).toContain(res);
  }
});

test("tactical: correctly choose the winning choice from the last pick", () => {
  expect(strategies.tactical.fn("rock")).toBe("paper");
  expect(strategies.tactical.fn("paper")).toBe("scissor");
  expect(strategies.tactical.fn("scissor")).toBe("rock");
});
