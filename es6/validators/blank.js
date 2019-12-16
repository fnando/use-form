import { toErrorMessage, toLabel } from "../helpers";
export function blank(options) {
    return (attribute, input, values) => {
        var _a;
        input = [undefined, null, false, ""].includes(input) ? "" : String(input);
        return {
            valid: input.trim() === "",
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "blank",
            values,
            input,
            args: [],
            message: toErrorMessage({
                defaultMessage: `${toLabel(attribute)} must be blank`,
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        };
    };
}
//# sourceMappingURL=blank.js.map