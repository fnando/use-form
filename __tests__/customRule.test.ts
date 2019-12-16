import { Validator, RuleOptions } from "types";
import { regex } from "validators/regex";

export function emailFormat<Params>(
  options?: RuleOptions<Params>,
): Validator<Params> {
  return regex(/^\S+@\S+$/, {
    message: ({ attribute }) => `${attribute} is not a valid email address`,
    ...options,
    type: "emailFormat",
  });
}

it("returns result", () => {
  const result = emailFormat()("email", "invalid", { a: 1 });

  expect(result).toEqual({
    attribute: "email",
    message: "email is not a valid email address",
    args: [/^\S+@\S+$/],
    input: "invalid",
    values: { a: 1 },
    type: "emailFormat",
    valid: false,
  });
});

it("fails", () => {
  expect(emailFormat()("attr", "invalid", {}).valid).toBeFalsy();
});

it("passes", () => {
  expect(emailFormat()("attr", "john@example.com", {}).valid).toBeTruthy();
});
