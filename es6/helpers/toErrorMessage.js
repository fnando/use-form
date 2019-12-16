export function toErrorMessage({ defaultMessage, options, args, attribute, values, input, }) {
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
//# sourceMappingURL=toErrorMessage.js.map