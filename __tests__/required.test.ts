import { required } from "validators/required";

it("returns result", () => {
  const result = required()("name", "", { a: 1 });

  expect(result).toEqual({
    attribute: "name",
    message: "name cannot be blank",
    values: { a: 1 },
    args: [],
    input: "",
    type: "required",
    valid: false,
  });
});

it("fails", () => {
  expect(required()("attr", "", {}).valid).toBeFalsy();
  expect(required()("attr", "        ", {}).valid).toBeFalsy();
  expect(required()("attr", undefined, {}).valid).toBeFalsy();
  expect(required()("attr", null, {}).valid).toBeFalsy();
  expect(required()("attr", false, {}).valid).toBeFalsy();
  expect(required()("attr", [], {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(required()("attr", "hello", {}).valid).toBeTruthy();
  expect(required()("attr", 0, {}).valid).toBeTruthy();
  expect(required()("attr", 1, {}).valid).toBeTruthy();
  expect(required()("attr", true, {}).valid).toBeTruthy();
  expect(required()("attr", [1], {}).valid).toBeTruthy();
});
