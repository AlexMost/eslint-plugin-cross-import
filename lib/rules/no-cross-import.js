class Checker {
    constructor(packageName, regex, allowSet) {
        this.packageName = packageName;
        this.regex = regex;
        this.allowSet = allowSet;
    }
    getError(importPath) {
        const match = importPath.match(this.regex);
        if (!match) return null;
        const [_, importScope] = match;
        if (this.allowSet.has(importScope)) return null;
        if (importScope !== this.packageName) {
            return `You can't make cross import "${importScope}" in "${this.packageName}"`;
        }
        return null;
    }
}

module.exports = {
    create(context) {
        const filename = context.getFilename();
        const checkers = context.options
        .map(({ scopeRegex, allow = [] }) => ({ regex: new RegExp(scopeRegex), allowSet: new Set(allow) }))
        .filter(({ regex }) => (Boolean(filename.match(regex))))
        .map(({ regex, allowSet }) => {
            const packageName = filename.match(regex)[1];
            return new Checker(packageName, regex, allowSet);
        });
        const shouldCheck = checkers.length > 0;
        return {
            ImportDeclaration(node) {
                if (!shouldCheck) return;
                const importPath = node.source.value;

                checkers
                .map((ch) => (ch.getError(importPath)))
                .filter((err) => Boolean(err))
                .forEach((message) => {
                    context.report({ node, message });
                });
            }
        };
    }
};