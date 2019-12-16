import { blank } from "./blank";
import { not } from "./not";
export function required(options) {
    var _a;
    return not(blank(), Object.assign(Object.assign({}, options), { type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "required" }));
}
//# sourceMappingURL=required.js.map