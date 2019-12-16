import { eq, equalTo } from "validators/eq";

it("returns result", () => {
  const result = eq(1)("number", 2, { a: 1 });

  expect(result).toEqual({
    attribute: "number",
    message: "number must be equal to 1",
    args: [1],
    values: { a: 1 },
    input: 2,
    type: "eq",
    valid: false,
  });
});

it("defines alias", () => {
  expect(equalTo).toEqual(eq);
});

it("fails", () => {
  expect(eq(1)("attr", 2, {}).valid).toBeFalsy();
  expect(eq(true)("attr", false, {}).valid).toBeFalsy();
  expect(eq("1")("attr", 1, {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(eq(1)("attr", 1, {}).valid).toBeTruthy();
  expect(eq(true)("attr", true, {}).valid).toBeTruthy();
  expect(eq("a")("attr", "a", {}).valid).toBeTruthy();
});
