---
name: semark-protocol-method-write
description: Write or update Semark method signatures for TypeScript callables. Use when callable TSDoc is missing, stale, malformed, misplaced, or incomplete.
---

# Semark Protocol Method Write

Read `../semark-protocol/SKILL.md` completely before you edit a callable. Use its exact
method structure, tag order, coverage, and limits.

## Workflow

1. Read the applicable `AGENTS.md` files.
2. Read the enclosing file signature.
3. Read the complete callable implementation.
4. Inspect relevant types, callers, and tests when behavior remains unclear.
5. Identify behavior, inputs, results, side effects, failures, invariants, and limits.
6. Write or update one method signature.
7. Remove or replace unauthorized nearby comments.
8. Preserve approved directives and decorators.
9. Run the narrowest Semark check that covers the file.
10. Run the repository's focused check for the changed callable.

## Writing decisions

Document only behavior that matters across the callable boundary. The TypeScript
declaration remains the structural authority.

Use parameter descriptions to explain meaning or constraints. Do not repeat a parameter
name in prose without adding information.

Use `@throws` only for an intentional failure category that can cross the boundary. Do
not list every internal exception when the callable converts or contains it.

Use remarks labels only when they add non-obvious behavior. Omit empty labels and tags.

If the existing signature conflicts with the implementation, update the signature and
report the mismatch. Do not change implementation behavior unless the user requests it.

## Completion report

Report the changed callable, the behavior that the signature records, and the checks
that passed.
