import { length, len, size } from "validators/length";

it("returns result", () => {
  const result = length(3)("secret", "ab", { a: 1 });

  expect(result).toEqual({
    attribute: "secret",
    message: "secret must have size equals to 3",
    values: { a: 1 },
    args: [{ is: 3 }],
    input: "ab",
    type: "length",
    valid: false,
  });
});

it("defines aliases", () => {
  expect(len).toEqual(length);
  expect(size).toEqual(length);
});

it("validates using :min", () => {
  const result = length({ min: 3 })("secret", "1", {});

  expect(result.message).toEqual("secret is too short");
});

it("validates using :max", () => {
  const result = length({ min: 3 })("secret", "1", {});

  expect(result.message).toEqual("secret is too short");
});

it("validates using :is", () => {
  const result = length({ is: 3 })("secret", "1", {});

  expect(result.message).toEqual("secret must have size equals to 3");
});

it("fails", () => {
  expect(length(3)("attr", "a", {}).valid).toBeFalsy();
  expect(length({ is: 3 })("attr", "a", {}).valid).toBeFalsy();
  expect(length({ max: 1 })("attr", "ab", {}).valid).toBeFalsy();
  expect(length({ min: 3 })("attr", "a", {}).valid).toBeFalsy();

  expect(length(3)("attr", [], {}).valid).toBeFalsy();
  expect(length({ is: 3 })("attr", [], {}).valid).toBeFalsy();
  expect(length({ max: 1 })("attr", [1, 2, 3], {}).valid).toBeFalsy();
  expect(length({ min: 3 })("attr", [], {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(length(3)("attr", "abc", {}).valid).toBeTruthy();
  expect(length({ is: 3 })("attr", "abc", {}).valid).toBeTruthy();
  expect(length({ max: 1 })("attr", "a", {}).valid).toBeTruthy();
  expect(length({ min: 3 })("attr", "abc", {}).valid).toBeTruthy();

  expect(length(3)("attr", [1, 2, 3], {}).valid).toBeTruthy();
  expect(length({ is: 3 })("attr", [1, 2, 3], {}).valid).toBeTruthy();
  expect(length({ max: 1 })("attr", [1], {}).valid).toBeTruthy();
  expect(length({ min: 3 })("attr", [1, 2, 3], {}).valid).toBeTruthy();
});
