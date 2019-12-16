import { gt, greaterThan } from "validators/gt";

it("returns result", () => {
  const result = gt(1)("number", 1, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number must be greater than 1",
    args: [1],
    input: 1,
    values: { a: 1 },
    type: "gt",
    valid: false,
  });
});

it("defines alias", () => {
  expect(greaterThan).toEqual(gt);
});

it("fails", () => {
  expect(gt(1)("attr", 1, {}).valid).toBeFalsy();
  expect(gt(1)("attr", 0, {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(gt(1)("attr", 2, {}).valid).toBeTruthy();
});
