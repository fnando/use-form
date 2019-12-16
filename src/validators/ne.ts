import { RuleOptions, Validator } from "..";
import { eq } from "./eq";
import { not } from "./not";

/**
 * Validates that the specified value is not equal to another.
 *
 * @example
 * ```ts
 * useForm(({ ne }) => ({
 *   username: [ne("admin")]
 * }));
 * ```
 *
 * @param {number|string|boolean} reference The comparison value.
 * @param {RulesOptions} options The validator options.
 * @return {Validator} The validation object.
 */
export function ne<Params>(
  reference: number | string | boolean,
  options?: RuleOptions<Params>,
): Validator<Params> {
  return not(eq(reference), {
    ...options,
    type: options?.type || "ne",
  });
}

export const notEqualTo = ne;
