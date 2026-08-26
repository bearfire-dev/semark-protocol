# Write a method signature

Read these rule modules before you edit a callable:

- [source-scope.md](../rules/source-scope.md)
- [comments.md](../rules/comments.md)
- [method-signature.md](../rules/method-signature.md)
- [accuracy.md](../rules/accuracy.md)

Their formats and limits are authoritative.

## Workflow

1. Read the enclosing file signature.
2. Identify behavior, inputs, results, side effects, failures, invariants, and limits.

## Writing decisions

Document only behavior that matters across the callable boundary. The TypeScript
declaration remains the structural authority.

Use parameter descriptions to explain meaning or constraints. Do not repeat a parameter
name in prose without new information.

Use `@throws` only for an intentional failure category that can cross the boundary. Do
not list internal exceptions that the callable converts or contains.

Use remarks labels only when they add non-obvious behavior. Omit empty labels and tags.
