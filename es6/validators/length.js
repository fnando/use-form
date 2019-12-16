import { toErrorMessage, toLabel } from "../helpers";
export function length(requirements, options) {
    return (attribute, input, values) => {
        var _a;
        requirements =
            typeof requirements === "number" ? { is: requirements } : requirements;
        const checks = [];
        let message = `${toLabel(attribute)} is invalid`;
        const size = input.length;
        if ("max" in requirements) {
            checks.push(size <= requirements.max);
            message = `${toLabel(attribute)} is too long`;
        }
        if ("min" in requirements) {
            checks.push(size >= requirements.min);
            message = `${toLabel(attribute)} is too short`;
        }
        if ("is" in requirements) {
            checks.push(size === requirements.is);
            message = `${toLabel(attribute)} must have size equals to ${requirements.is}`;
        }
        const valid = checks.every(Boolean);
        return {
            attribute,
            input,
            values,
            args: [requirements],
            message: toErrorMessage({
                defaultMessage: message,
                args: [requirements],
                input,
                values,
                attribute,
                options,
            }),
            type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "length",
            valid,
        };
    };
}
export const len = length;
export const size = length;
//# sourceMappingURL=length.js.map