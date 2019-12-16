import { blank } from "validators/blank";

it("returns result", () => {
  const result = blank()("honeypot", "invalid", { a: 1 });

  expect(result).toEqual({
    attribute: "honeypot",
    message: "honeypot must be blank",
    args: [],
    values: { a: 1 },
    input: "invalid",
    type: "blank",
    valid: false,
  });
});

it("fails", () => {
  expect(blank()("attr", "hello", {}).valid).toBeFalsy();
  expect(blank()("attr", 0, {}).valid).toBeFalsy();
  expect(blank()("attr", 1, {}).valid).toBeFalsy();
  expect(blank()("attr", true, {}).valid).toBeFalsy();
  expect(blank()("attr", [1], {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(blank()("attr", "", {}).valid).toBeTruthy();
  expect(blank()("attr", "        ", {}).valid).toBeTruthy();
  expect(blank()("attr", undefined, {}).valid).toBeTruthy();
  expect(blank()("attr", null, {}).valid).toBeTruthy();
  expect(blank()("attr", false, {}).valid).toBeTruthy();
  expect(blank()("attr", [], {}).valid).toBeTruthy();
});
