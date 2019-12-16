import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage } from "../helpers";

/**
 * Negates value. This is meant to be used with other validators like in
 * `not(blank())`.
 *
 * @example
 * ```ts
 * useForm(({ not, blank }) => ({
 *   password: [not(blank())]
 * }));
 * ```
 *
 * @param {Validator} func The validation that must be negated.
 * @param {RuleOptions} options The validator options.
 * @param {string} options.type Override the validation type. If not specified,
 *                              defaults to `not.<negated validation>`.
 * @return {Validator} The validation object.
 */
export function not<Params>(
  func: Validator<Params>,
  options?: RuleOptions<Params>,
): Validator<Params> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    attribute: string,
    input: any,
    values: Values<Params>,
  ): Validation<Params> => {
    const result = func(attribute, input, values);
    const message = result.message.replace("must", "cannot");
    options = options || {};

    return {
      valid: !result.valid,
      type: options?.type || `not.${result.type}`,
      input,
      args: result.args,
      values,
      message: toErrorMessage({
        defaultMessage: message,
        args: [],
        input,
        values,
        attribute,
        options,
      }),
      attribute,
    };
  };
}
