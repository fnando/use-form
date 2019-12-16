import { toErrorMessage, toLabel } from "../helpers";
export function eq(reference, options) {
    return (attribute, input, values) => {
        var _a;
        return ({
            valid: input === reference,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "eq",
            input,
            values,
            args: [reference],
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be equal to ${reference}`,
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
export const equalTo = eq;
//# sourceMappingURL=eq.js.map