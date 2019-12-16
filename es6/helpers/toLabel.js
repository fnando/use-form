export function toLabel(attribute) {
    return attribute
        .replace(/_/g, " ")
        .replace(/([A-Z]+)/g, (_match, group) => ` ${group.toLowerCase()}`);
}
//# sourceMappingURL=toLabel.js.map