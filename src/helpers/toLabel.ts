/**
 * Convert an attribute with underscore into a readable version.
 *
 * @example
 * ```ts
 * toLabel("full_name")
 * // full name
 *
 * toLabel("fullName")
 * // full name
 * ```
 *
 * @internal
 * @param {string} attribute The attribute name.
 * @returns {string} The human version of the attribute.
 */
export function toLabel(attribute: string): string {
  return attribute
    .replace(/_/g, " ")
    .replace(/([A-Z]+)/g, (_match, group) => ` ${group.toLowerCase()}`);
}
