import { confirm } from "validators/confirm";

it("returns result", () => {
  const result = confirm("number")("number_confirmation", 2, { number: 1 });

  expect(result).toEqual({
    attribute: "number_confirmation",
    message: "confirmation must match number",
    args: ["number"],
    values: {
      number: 1,
    },
    input: 2,
    type: "confirm",
    valid: false,
  });
});

it("fails", () => {
  expect(confirm("a")("b", "1", { a: 1 }).valid).toBeFalsy();
  expect(confirm("a")("b", false, { a: "false" }).valid).toBeFalsy();
  expect(confirm("a")("b", 1, { a: "1" }).valid).toBeFalsy();
});

it("passes", () => {
  expect(confirm("a")("b", "x", { a: "x" }).valid).toBeTruthy();
  expect(confirm("a")("b", false, { a: false }).valid).toBeTruthy();
  expect(confirm("a")("b", 1, { a: 1 }).valid).toBeTruthy();
});
