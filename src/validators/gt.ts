import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is greater than another.
 *
 * @example
 * ```ts
 * useForm(({ gt }) => ({
 *   age: gt(13)
 * }));
 * ```
 *
 * @param {number} reference The comparison value.
 * @param {RulesOptions} options The validator options.
 * @return {Validator} The validation object.
 */
export function gt<Params>(
  reference: number,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: input > reference,
    type: options?.type || "gt",
    input,
    values,
    args: [reference],
    message: toErrorMessage({
      defaultMessage: `${toLabel(attribute)} must be greater than ${reference}`,
      args: [reference],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}

export const greaterThan = gt;
