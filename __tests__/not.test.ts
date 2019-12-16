/* eslint-disable no-empty-pattern */
import { blank } from "validators/blank";
import { not } from "validators/not";

it("returns result", () => {
  const result = not(blank())("name", "", { a: 1 });

  expect(result).toEqual({
    attribute: "name",
    message: "name cannot be blank",
    values: { a: 1 },
    args: [],
    input: "",
    type: "not.blank",
    valid: false,
  });
});

it("negates values", () => {
  expect(not(blank())("attr", "", {}).valid).toBeFalsy();
  expect(not(blank())("attr", "hello", {}).valid).toBeTruthy();
});
