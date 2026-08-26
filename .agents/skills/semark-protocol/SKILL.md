---

## name: semark-protocol
description: Apply Semark Protocol in TypeScript repositories. Use for installation, configuration, audits, signatures, discovery, naming, TSDoc, comments, or protocol writing.

# Semark Protocol

Semark Protocol makes repository knowledge progressively discoverable. The repository
stores the context. Agents use normal shell and file operations to retrieve it.

This is the only Semark skill. It routes each request to one workflow and the rules that
the workflow needs. The rule modules in `rules/` are the single source of truth.

## Route

Select one path:


| Request                                     | Read                                                     |
| ------------------------------------------- | -------------------------------------------------------- |
| Install or configure Semark                 | [references/install.md](references/install.md)           |
| Audit compliance or report findings         | [references/audit.md](references/audit.md)               |
| Write or update a file signature            | [references/file-write.md](references/file-write.md)     |
| Write or update method signatures           | [references/method-write.md](references/method-write.md) |
| Answer a Semark rule or compliance question | Read the matching module below                           |


Read each selected workflow completely. For each workflow, read
[rules/writing.md](rules/writing.md) and [rules/validation.md](rules/validation.md).
Then read only the additional rule modules that the workflow identifies. If a request
contains multiple operations, read each shared module one time.

## Shared behavior

- Use the injected repository instructions. Check for a nearer `AGENTS.md` or
`AGENTS.override.md` only when a target is below the current directory.
- Start with the smallest relevant context. Inspect related code only to resolve an
uncertainty.
- Treat source code and configuration as implementation authority. Do not infer
unsupported behavior.
- Do not change source behavior unless the user requests it.
- Run the configured Semark check when it exists. After an edit, run the focused
repository checks and correct violations that the edit causes.
- Report the scope, changes or findings, check results, and unresolved work outside the
requested scope.



## Signature changes

For a file or method signature:

1. Read the complete implementation that the signature documents.
2. Inspect related types, callers, and tests only when the documented boundary is
  unclear.
3. Derive each statement from implementation evidence.
4. Write or update one signature.
5. Remove unauthorized comments in the changed area.
6. Preserve approved directives, decorators, and their required positions.

If a signature conflicts with the implementation, update the signature and report the
mismatch. Report the changed target and the behavior or boundary that the signature
records.

## Rule modules


| Module                                                   | Content                                                 |
| -------------------------------------------------------- | ------------------------------------------------------- |
| [rules/purpose.md](rules/purpose.md)                     | Semark principles and requirements.                     |
| [rules/discovery.md](rules/discovery.md)                 | Discovery hierarchy and progressive discovery workflow. |
| [rules/readme-boundaries.md](rules/readme-boundaries.md) | AGENTS.md and README documentation boundaries.          |
| [rules/naming.md](rules/naming.md)                       | Naming protocol.                                        |
| [rules/source-scope.md](rules/source-scope.md)           | Applicable files and exclusions.                        |
| [rules/comments.md](rules/comments.md)                   | Approved source comments and directives.                |
| [rules/tsdoc-config.md](rules/tsdoc-config.md)           | `@semarkFile` TSDoc configuration.                      |
| [rules/file-signature.md](rules/file-signature.md)       | File signature format and limits.                       |
| [rules/method-signature.md](rules/method-signature.md)   | Method signature format and limits.                     |
| [rules/writing.md](rules/writing.md)                     | Semark signature and protocol writing rules.            |
| [rules/accuracy.md](rules/accuracy.md)                   | Signature accuracy rule.                                |
| [rules/validation.md](rules/validation.md)               | Validation requirements.                                |


