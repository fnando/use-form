import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is less than or equal to another.
 *
 * @example
 * ```ts
 * useForm(({ lte }) => ({
 *   bid: [lte(9999)]
 * }));
 * ```
 *
 * @param {number} reference The comparison value.
 * @param {RulesOptions} options The validator options.
 * @return {Validator} The validation object.
 *
 */
export function lte<Params>(
  reference: number,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: input <= reference,
    type: options?.type || "lte",
    input,
    values,
    args: [reference],
    message: toErrorMessage({
      defaultMessage: `${toLabel(
        attribute,
      )} must be less than or equal to ${reference}`,
      args: [reference],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}

export const lessThanOrEqualTo = lte;
