module.exports = {
  excludePrivate: true,
  excludeProtected: true,
  externalPattern: "src/.+.(?!=test.)ts$",
  ignoreCompilerErrors: true,
  includeDeclarations: true,
  mode: "modules",
  out: "docs",
};
