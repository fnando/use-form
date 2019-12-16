import { range } from "validators/range";

it("returns result", () => {
  const result = range(18, 99)("age", "17", { a: 1 });

  expect(result).toEqual({
    attribute: "age",
    message: "age must be within 18-99 range",
    args: [18, 99],
    values: { a: 1 },
    input: 17,
    type: "range",
    valid: false,
  });
});

it("fails", () => {
  expect(range(18, 99)("attr", "a", {}).valid).toBeFalsy();
  expect(range(18, 99)("attr", "a", {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(range(18, 99)("attr", "42", {}).valid).toBeTruthy();
  expect(range(18, 99)("attr", "42", {}).valid).toBeTruthy();
});
