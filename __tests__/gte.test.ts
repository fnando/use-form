import { gte, greaterThanOrEqualTo } from "validators/gte";

it("returns result", () => {
  const result = gte(1)("number", 0, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number must be greater than or equal to 1",
    values: { a: 1 },
    args: [1],
    input: 0,
    type: "gte",
    valid: false,
  });
});

it("defines alias", () => {
  expect(greaterThanOrEqualTo).toEqual(gte);
});

it("fails", () => {
  expect(gte(1)("attr", 0, {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(gte(1)("attr", 2, {}).valid).toBeTruthy();
  expect(gte(1)("attr", 1, {}).valid).toBeTruthy();
});
