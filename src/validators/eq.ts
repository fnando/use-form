import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is equal to another.
 *
 * @example
 * ```ts
 * useForm(({ eq }) => ({
 *   captcha: [eq("I'm not a bot")]
 * }));
 * ```
 *
 * @param {number|string|boolean} reference The expected value.
 * @param {RulesOptions} options The validator options.
 * @returns {Validator} The validation object.
 */
export function eq<Params>(
  reference: number | string | boolean,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number | string | boolean,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: input === reference,
    type: options?.type || "eq",
    input,
    values,
    args: [reference],
    message: toErrorMessage({
      defaultMessage: `${toLabel(attribute)} must be equal to ${reference}`,
      args: [reference],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}

export const equalTo = eq;
