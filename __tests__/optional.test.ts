import { regex } from "validators/regex";
import { optional } from "validators/optional";

it("returns result", () => {
  const result = optional(regex(/^\S+@\S+$/))("email", "", { a: 1 });

  expect(result).toEqual({
    attribute: "email",
    message: "email must be valid",
    values: { a: 1 },
    args: [],
    input: "",
    type: "regex",
    valid: true,
    optional: true,
  });
});

it("fails", () => {
  expect(optional(regex(/^\d+$/))("attr", "a", {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(optional(regex(/^\d+$/))("attr", "42", {}).valid).toBeTruthy();
  expect(optional(regex("^\\d+$"))("attr", "42", {}).valid).toBeTruthy();
  expect(optional(regex("^\\d+$"))("attr", "", {}).valid).toBeTruthy();
  expect(optional(regex("^\\d+$"))("attr", undefined, {}).valid).toBeTruthy();
});
