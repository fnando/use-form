import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is within a numeric range.
 *
 * @example
 * ```ts
 * useForm(({ range }) => ({
 *   age: [range(19, 99)]
 * }));
 * ```
 *
 * @param {number} start The starting boundary of the range.
 * @param {number} end The ending boundary of the range.
 * @param {RulesOptions} options The validator options.
 * @return {Validator} The validation object.
 */
export function range<Params>(
  start: number,
  end: number,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number | string,
    values: Values<Params>,
  ): Validation<Params> => {
    input = parseFloat(input as string);

    return {
      valid: input >= start && input <= end,
      type: options?.type || "range",
      input,
      args: [start, end],
      values,
      message: toErrorMessage({
        defaultMessage: `${toLabel(
          attribute,
        )} must be within ${start}-${end} range`,
        args: [start, end],
        input,
        values,
        attribute,
        options,
      }),
      attribute,
    };
  };
}
