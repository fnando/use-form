import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that two attributes have the same value.
 *
 * @example
 * ```ts
 * useForm(({confirm}) => ({
 *   passwordConfirmation: [confirm("password")]
 * }));
 * ```
 *
 * @param {string} confirmingAttribute The attribute that must be matched.
 * @param {RulesOptions} options The validator options.
 * @returns {Validator} The validation object.
 */
export function confirm<Params>(
  confirmingAttribute: string,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    input: number | string | boolean,
    values: Values<Params>,
  ): Validation<Params> => {
    const confirmingValue = values[confirmingAttribute as keyof Params];
    const valid = confirmingValue ? input === confirmingValue : true;

    return {
      valid,
      type: options?.type || "confirm",
      args: [confirmingAttribute],
      input,
      values,
      message: toErrorMessage({
        defaultMessage: `confirmation must match ${toLabel(
          confirmingAttribute,
        )}`,
        args: [confirmingAttribute],
        input,
        values,
        attribute,
        options,
      }),
      attribute,
    };
  };
}
