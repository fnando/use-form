import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is one of the list's item.
 *
 * @example
 * ```ts
 * useForm(({ oneOf }) => ({
 *   theme: [oneOf(["dark", "light"])]
 * }));
 * ```
 *
 * @param {array} list The available list of values.
 * @param {RulesOptions} options The validator options.
 * @return {Validator} The validation object.
 */
export function oneOf<Params>(
  list: any[],
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: any,
    values: Values<Params>,
  ): Validation<Params> => ({
    valid: list.flat().includes(input),
    type: options?.type || "oneOf",
    input,
    args: [list],
    values,
    message: toErrorMessage({
      defaultMessage: `${toLabel(attribute)} must be one of ${list.join(", ")}`,
      args: [list],
      input,
      values,
      attribute,
      options,
    }),
    attribute,
  });
}
