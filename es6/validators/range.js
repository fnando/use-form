import { toErrorMessage, toLabel } from "../helpers";
export function range(start, end, options) {
    return (attribute, input, values) => {
        var _a;
        input = parseFloat(input);
        return {
            valid: input >= start && input <= end,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "range",
            input,
            args: [start, end],
            values,
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be within ${start}-${end} range`,
                args: [start, end],
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        };
    };
}
//# sourceMappingURL=range.js.map