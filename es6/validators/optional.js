import { toErrorMessage } from "../helpers";
export function optional(validator, options) {
    return (attribute, input, values) => {
        var _a;
        const result = validator(attribute, input, values);
        return {
            valid: ["", undefined].includes(input) || result.valid,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || result.type,
            optional: true,
            input,
            args: [],
            values,
            message: toErrorMessage({
                defaultMessage: result.message,
                args: [],
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        };
    };
}
//# sourceMappingURL=optional.js.map