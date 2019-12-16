import { toErrorMessage, toLabel } from "../helpers";
export function lt(reference, options) {
    return (attribute, input, values) => {
        var _a;
        return ({
            valid: input < reference,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "lt",
            input,
            values,
            args: [reference],
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be less than ${reference}`,
                args: [reference],
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        });
    };
}
export const lessThan = lt;
//# sourceMappingURL=lt.js.map