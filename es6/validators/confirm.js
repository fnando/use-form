import { toErrorMessage, toLabel } from "../helpers";
export function confirm(confirmingAttribute, options) {
    return (attribute, input, values) => {
        var _a;
        const confirmingValue = values[confirmingAttribute];
        const valid = confirmingValue ? input === confirmingValue : true;
        return {
            valid,
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "confirm",
            args: [confirmingAttribute],
            input,
            values,
            message: toErrorMessage({
                defaultMessage: `confirmation must match ${toLabel(confirmingAttribute)}`,
                args: [confirmingAttribute],
                input,
                values,
                attribute,
                options,
            }),
            attribute,
        };
    };
}
//# sourceMappingURL=confirm.js.map