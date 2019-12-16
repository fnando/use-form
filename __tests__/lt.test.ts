import { lt, lessThan } from "validators/lt";

it("returns result", () => {
  const result = lt(1)("number", 1, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number must be less than 1",
    values: { a: 1 },
    args: [1],
    input: 1,
    type: "lt",
    valid: false,
  });
});

it("defines alias", () => {
  expect(lessThan).toEqual(lt);
});

it("fails", () => {
  expect(lt(1)("attr", 1, {}).valid).toBeFalsy();
  expect(lt(1)("attr", 2, {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(lt(1)("attr", 0, {}).valid).toBeTruthy();
});
