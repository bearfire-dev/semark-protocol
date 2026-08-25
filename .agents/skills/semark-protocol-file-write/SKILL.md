---
name: semark-protocol-file-write
description: Write or update Semark file signatures in TypeScript source. Use when a file needs a missing, stale, malformed, or misplaced @semarkFile TSDoc block.
---

# Semark Protocol File Write

Read `../semark-protocol/SKILL.md` completely before you edit a file. Copy its exact file
signature structure, placement rules, and limits.

## Workflow

1. Read the applicable `AGENTS.md` files.
2. Read the package `README.md`.
3. Read the complete source file.
4. Inspect directly related files only when the boundary is unclear.
5. Identify the file purpose, owned responsibility, boundary, and relationships.
6. Write or update one file signature.
7. Remove or replace unauthorized file-level comments.
8. Preserve approved directives and their required positions.
9. Run the narrowest Semark check that covers the file.
10. Run the repository's focused check for the changed file.

## Writing decisions

Use the filename, exports, types, callers, and tests as evidence. Do not infer a larger
responsibility than the implementation owns.

The purpose states why the file exists. The responsibility states the behavior that it
owns. The boundary states what it accepts, delegates, or does not own.

Do not list symbols. Do not narrate control flow. Do not include a fact that the filename
and types already make fully clear.

If the existing signature conflicts with the implementation, update the signature and
report the mismatch. Do not change implementation behavior unless the user requests it.

## Completion report

Report the changed file, the responsibility and boundary that the signature records,
and the checks that passed.
