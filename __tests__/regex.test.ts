import { regex, re } from "validators/regex";

it("returns result", () => {
  const result = regex(/^\d+$/)("age", "invalid", { a: 1 });

  expect(result).toEqual({
    attribute: "age",
    message: "age must be valid",
    args: [/^\d+$/],
    values: { a: 1 },
    input: "invalid",
    type: "regex",
    valid: false,
  });
});

it("defines alias", () => {
  expect(re).toEqual(regex);
});

it("fails", () => {
  expect(regex(/^\d+$/)("attr", "a", {}).valid).toBeFalsy();
  expect(regex("^\\d+$")("attr", "a", {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(regex(/^\d+$/)("attr", "42", {}).valid).toBeTruthy();
  expect(regex("^\\d+$")("attr", "42", {}).valid).toBeTruthy();
});
