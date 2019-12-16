import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value is blank.
 *
 * Blank means:
 *
 * - Empty string
 * - Empty array
 * - `undefined`
 * - `null`
 * - `false`
 *
 * @example
 * ```ts
 * useForm(({ blank }) => ({
 *   honeypot: [blank()]
 * }));
 * ```
 *
 * @param {RulesOptions} options The validator options.
 * @returns {Validator} The validation object.
 */
export function blank<Params>(
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: string | undefined | null | boolean,
    values: Values<Params>,
  ): Validation<Params> => {
    input = [undefined, null, false, ""].includes(input) ? "" : String(input);

    return {
      valid: input.trim() === "",
      type: options?.type || "blank",
      values,
      input,
      args: [],
      message: toErrorMessage({
        defaultMessage: `${toLabel(attribute)} must be blank`,
        input,
        values,
        attribute,
        options,
      }),
      attribute,
    };
  };
}
