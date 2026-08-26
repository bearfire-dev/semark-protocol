# Write a file signature

Read these rule modules before you edit a file:

- [source-scope.md](../rules/source-scope.md)
- [comments.md](../rules/comments.md)
- [file-signature.md](../rules/file-signature.md)
- [accuracy.md](../rules/accuracy.md)

Their formats and limits are authoritative.

## Workflow

1. Read the package `README.md`.
2. Identify the file purpose, owned responsibility, boundary, and relationships.

## Writing decisions

Use the filename, exports, types, callers, and tests as evidence. Do not infer a larger
responsibility than the implementation owns.

The purpose states why the file exists. The responsibility states the behavior that it
owns. The boundary states what it accepts, delegates, or does not own.

Do not list symbols. Do not describe control flow. Do not include a fact that the
filename and types already make fully clear.
