import { eq } from "./eq";
import { not } from "./not";
export function ne(reference, options) {
    var _a;
    return not(eq(reference), Object.assign(Object.assign({}, options), { type: ((_a = options) === null || _a === void 0 ? void 0 : _a.type) || "ne" }));
}
export const notEqualTo = ne;
//# sourceMappingURL=ne.js.map