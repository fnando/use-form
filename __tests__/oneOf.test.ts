import { oneOf } from "validators/oneOf";

it("returns result", () => {
  const result = oneOf([1, 2, 3])("number", 4, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number must be one of 1, 2, 3",
    values: { a: 1 },
    args: [[1, 2, 3]],
    input: 4,
    type: "oneOf",
    valid: false,
  });
});

it("fails", () => {
  expect(oneOf([1, 2, 3])("attr", 4, {}).valid).toBeFalsy();
  expect(oneOf([1, 2, 3])("attr", "1", {}).valid).toBeFalsy();
  expect(oneOf([1, 2, 3])("attr", 4, {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(oneOf([1, 2, 3])("attr", 3, {}).valid).toBeTruthy();
});
