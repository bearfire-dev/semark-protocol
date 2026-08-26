# Approved source comments

Each comment in an applicable source file must be one of these forms:

1. A file signature.
2. A method signature.
3. A recognized compiler, tooling, license, or generated-code directive.

Do not use narrative implementation comments, commented-out code, informal TODO notes,
scratch notes, history, speculation, duplicated documentation, or arbitrary comments.
Track pending work in the repository issue system.

Approved directive categories include:

- TypeScript directives such as `@ts-expect-error` and `@ts-ignore`
- lint directives with the exact syntax of the linter
- coverage directives for the configured coverage tool
- formatter directives with the exact syntax of the formatter
- license headers
- generated-file markers
- TypeScript triple-slash directives

A directive must use recognizable tool syntax. Add only the explanation that the tool
requires. A directive must not become general documentation.
