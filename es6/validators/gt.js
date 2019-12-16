import { toErrorMessage, toLabel } from "../helpers";
export function gt(reference, options) {
    return (attribute, input, values) => {
        var _a;
        return ({
            valid: input > reference,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "gt",
            input,
            values,
            args: [reference],
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be greater than ${reference}`,
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
export const greaterThan = gt;
//# sourceMappingURL=gt.js.map