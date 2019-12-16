import { lte, lessThanOrEqualTo } from "validators/lte";

it("returns result", () => {
  const result = lte(1)("number", 2, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number must be less than or equal to 1",
    args: [1],
    values: { a: 1 },
    input: 2,
    type: "lte",
    valid: false,
  });
});

it("defines alias", () => {
  expect(lessThanOrEqualTo).toEqual(lte);
});

it("fails", () => {
  expect(lte(1)("attr", 2, {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(lte(1)("attr", 0, {}).valid).toBeTruthy();
  expect(lte(1)("attr", 1, {}).valid).toBeTruthy();
});
