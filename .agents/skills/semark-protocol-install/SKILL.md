---
name: semark-protocol-install
description: Install Semark Protocol in a TypeScript repository or package. Use for initial configuration, migration scope, validation commands, README coverage, and agent instructions.
---

# Semark Protocol Install

Read `../semark-protocol/SKILL.md` completely before you change the target repository.
Its definitions and formats are authoritative.

## Authorization boundary

Install Semark only in the repository or packages that the user places in scope. Do
not rewrite source comments or generate semantic signatures unless the user includes
that migration work.

## Installation workflow

1. Read all applicable `AGENTS.md` files.
2. Inspect the root README, package layout, package manager, and existing TSDoc tools.
3. Identify applicable TypeScript files and explicit exclusions.
4. Record the initial migration scope before you change enforcement.
5. Add the `@semarkFile` TSDoc configuration from the canonical skill.
6. Add repository-local validation tooling that fits the existing toolchain.
7. Add a package script or documented command for the Semark check.
8. Add missing root or package README files within the requested scope.
9. Update `AGENTS.md` with discovery, maintenance, and check instructions.
10. Configure approved directive patterns and stable path exclusions.
11. Run the repository checks and the Semark check.

## Migration behavior

Do not enable a failing full-repository check without a migration plan. Use one of
these explicit baselines:

- all applicable files comply now
- only changed files must comply during an incremental migration
- listed packages comply while other packages remain excluded

State the selected baseline in repository configuration or instructions. Give each
temporary exclusion an owner, reason, or removal condition when the repository supports
that metadata.

Do not silently exempt a violation. Do not weaken a canonical format to preserve an
existing comment.

## Validation tooling

Prefer existing TSDoc parsers and repository scripts. Add the smallest local tool that
can check the configured scope, placement, tags, ordering, lengths, and comment policy.

The check must return a nonzero status for violations. It must report the file, source
location, and violation type. It must not author descriptions.

## Completion report

Report:

- changed files
- configured scope and exclusions
- migration baseline
- check command
- check results
- remaining migration work that the user did not request
