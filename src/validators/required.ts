import { Validator, RuleOptions } from "..";
import { blank } from "./blank";
import { not } from "./not";

/**
 * Validates that the specified value is filled (i.e. not blank).
 *
 * @example
 * ```ts
 * useForm(({ required }) => ({
 *   passwordConfirmation: [required()]
 * }));
 * ```
 *
 * @param {RuleOptions} options The validator options.
 * @return {Validator} The validation object.
 */
export function required<Params>(
  options?: RuleOptions<Params>,
): Validator<Params> {
  return not(blank(), { ...options, type: options?.type || "required" });
}
