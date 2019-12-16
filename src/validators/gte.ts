import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is greater than or equal to another.
 *
 * @example
 * ```ts
 * useForm(({ gte }) => ({
 *   age: gte(13)
 * }));
 * ```
 *
 * @param {number} reference The comparison value.
 * @param {RulesOptions} options The validator options.
 * @returns {Validator} The validation object.
 */
export function gte<Params>(
  reference: number,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: input >= reference,
    type: options?.type || "gte",
    input,
    values,
    args: [reference],
    message: toErrorMessage({
      defaultMessage: `${toLabel(
        attribute,
      )} must be greater than or equal to ${reference}`,
      args: [reference],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}

export const greaterThanOrEqualTo = gte;
