import { toErrorMessage, toLabel } from "../helpers";
export function lte(reference, options) {
    return (attribute, input, values) => {
        var _a;
        return ({
            valid: input <= reference,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "lte",
            input,
            values,
            args: [reference],
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be less than or equal to ${reference}`,
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
export const lessThanOrEqualTo = lte;
//# sourceMappingURL=lte.js.map