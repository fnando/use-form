import { toErrorMessage, toLabel } from "../helpers";
export function regex(pattern, options) {
    return (attribute, input, values) => {
        var _a;
        return ({
            valid: new RegExp(pattern).test(input),
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "regex",
            args: [pattern],
            input,
            values,
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be valid`,
                args: [pattern],
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        });
    };
}
export const re = regex;
//# sourceMappingURL=regex.js.map