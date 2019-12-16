import { ne, notEqualTo } from "validators/ne";

it("returns result", () => {
  const result = ne(1)("number", 1, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number cannot be equal to 1",
    values: { a: 1 },
    args: [1],
    input: 1,
    type: "ne",
    valid: false,
  });
});

it("defines alias", () => {
  expect(notEqualTo).toEqual(ne);
});

it("fails", () => {
  expect(ne(1)("attr", 1, {}).valid).toBeFalsy();
  expect(ne(true)("attr", true, {}).valid).toBeFalsy();
  expect(ne("a")("attr", "a", {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(ne(1)("attr", 2, {}).valid).toBeTruthy();
  expect(ne(true)("attr", false, {}).valid).toBeTruthy();
  expect(ne("a")("attr", "b", {}).valid).toBeTruthy();
});
