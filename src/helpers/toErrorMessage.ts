import { ErrorBuilderOptions } from "..";

/**
 * Build an error message string.
 *
 * @internal
 * @param {ErrorBuilderOptions<Params>} options The options.
 * @returns {string} The error message.
 */
export function toErrorMessage<Params>({
  defaultMessage,
  options,
  args,
  attribute,
  values,
  input,
}: ErrorBuilderOptions<Params>): string {
  options = options || {};
  args = options.args || args || [];
  const messageBuilder = options.message ? options.message : defaultMessage;

  return typeof messageBuilder === "function"
    ? messageBuilder({
        input,
        attribute,
        values,
        args,
        options,
      })
    : messageBuilder;
}
