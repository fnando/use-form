import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value matches an regular expression.
 * If `pattern` is a string, then a regex is created with `new RegExp(pattern)`.
 *
 * @example
 * ```ts
 * regex(/^[0-9a-z_]+$/i)
 * regex("^[0-9a-zA-z_]+$")
 * regex(/^[0-9a-z_]+$/i, {message: "must be a valid username"})
 * ```
 *
 * @example
 * ```ts
 * useForm(({confirm}) => ({
 *   email: [regex(/^\S+@\S+$/)]
 * }));
 * ```
 *
 * @param {string|RegExp} pattern The expected pattern.
 * @param {RulesOptions} options The validator options.
 * @return {Validator} The validation object.
 */
export function regex<Params>(
  pattern: string | RegExp,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: string,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: new RegExp(pattern).test(input),
    type: options?.type || "regex",
    args: [pattern],
    input,
    values,
    message: toErrorMessage({
      defaultMessage: `${toLabel(attribute)} must be valid`,
      args: [pattern],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}

export const re = regex;
