import { toErrorMessage } from "../helpers";
export function not(func, options) {
    return (attribute, input, values) => {
        var _a;
        const result = func(attribute, input, values);
        const message = result.message.replace("must", "cannot");
        options = options || {};
        return {
            valid: !result.valid,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || `not.${result.type}`,
            input,
            args: result.args,
            values,
            message: toErrorMessage({
                defaultMessage: message,
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
//# sourceMappingURL=not.js.map