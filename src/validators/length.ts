import { RuleOptions, Validator, Validation, Values } from "..";
import { toErrorMessage, toLabel } from "../helpers";

/**
 * Validates that the specified value has the required size.
 *
 * @example
 * ```ts
 * length(3)
 * length({is: 3})
 * length({min: 3})
 * length({max: 3})
 * length({min: 3, max: 10})
 * len(3)
 * size(3)
 * ```
 *
 * @example
 * ```ts
 * useForm(({ len }) => ({
 *   password: [len({ min: 10 })]
 * }));
 * ```
 *
 * @param {number|options} requirements The expected requirements.
 * @param {number} options.min The minimum amount the length should be.
 * @param {number} options.max The maximum amount the length should be.
 * @param {number} options.is The exact amount the length should be.
 * @param {RulesOptions} options The validator options.
 * @returns {Validator} The validation object.
 */
export function length<Params>(
  requirements:
    | number
    | { min: number }
    | { max: number }
    | { min: number; max: number }
    | { is: number },
  options?: RuleOptions<Params>,
): Validator<Params> {
  return (
    attribute: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: string | any[],
    values: Values<Params>,
  ): Validation<Params> => {
    requirements =
      typeof requirements === "number" ? { is: requirements } : requirements;

    const checks: boolean[] = [];
    let message = `${toLabel(attribute)} is invalid`;
    const size: number = input.length;

    if ("max" in requirements) {
      checks.push(size <= requirements.max);
      message = `${toLabel(attribute)} is too long`;
    }

    if ("min" in requirements) {
      checks.push(size >= requirements.min);
      message = `${toLabel(attribute)} is too short`;
    }

    if ("is" in requirements) {
      checks.push(size === requirements.is);
      message = `${toLabel(attribute)} must have size equals to ${
        requirements.is
      }`;
    }

    const valid = checks.every(Boolean);

    return {
      attribute,
      input,
      values,
      args: [requirements],
      message: toErrorMessage({
        defaultMessage: message,
        args: [requirements],
        input,
        values,
        attribute,
        options,
      }),
      type: options?.type || "length",
      valid,
    };
  };
}

export const len = length;
export const size = length;
