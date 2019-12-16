import { toErrorMessage, toLabel } from "../helpers";
export function oneOf(list, options) {
    return (attribute, input, values) => {
        var _a;
        return ({
            valid: list.flat().includes(input),
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "oneOf",
            input,
            args: [list],
            values,
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be one of ${list.join(", ")}`,
                args: [list],
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        });
    };
}
//# sourceMappingURL=oneOf.js.map