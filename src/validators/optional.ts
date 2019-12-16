import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage } from "../helpers";

/**
 * Make the validator optional. To be optional, the value must be either an
 * empty string or `null`.
 *
 * @example
 * ```ts
 * useForm(({ optional, regex }) => ({
 *   email: [ optional(regex(/^\S+@\S+$/)) ]
 * }));
 * ```
 *
 * @param {Validator} validator The optional validator.
 * @param {RuleOptions} options The validation options.
 * @return {Validator} The validation object.
 */
export function optional<Params>(
  validator: Validator<Params>,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: any,
    values: Values<Params>,
  ): Validation<Params> => {
    const result = validator(attribute, input, values);

    return {
      valid: ["", undefined].includes(input) || result.valid,
      type: options?.type || result.type,
      optional: true,
      input,
      args: [],
      values,
      message: toErrorMessage({
        defaultMessage: result.message,
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
