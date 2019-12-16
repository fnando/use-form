import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is less than another.
 *
 * @example
 * ```ts
 * useForm(({ lt }) => ({
 *   bid: [lt(9999)]
 * }));
 * ```
 *
 * @param {number} reference The comparison value.
 * @param {RulesOptions} options The validator options.
 * @returns {Validator} The validation object.
 */
export function lt<Params>(
  reference: number,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: input < reference,
    type: options?.type || "lt",
    input,
    values,
    args: [reference],
    message: toErrorMessage({
      defaultMessage: `${toLabel(attribute)} must be less than ${reference}`,
      args: [reference],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}

export const lessThan = lt;
