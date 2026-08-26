# Install or configure Semark

Read these rule modules before you change the target repository:

- [purpose.md](../rules/purpose.md)
- [discovery.md](../rules/discovery.md)
- [readme-boundaries.md](../rules/readme-boundaries.md)
- [source-scope.md](../rules/source-scope.md)
- [comments.md](../rules/comments.md)
- [tsdoc-config.md](../rules/tsdoc-config.md)
- [file-signature.md](../rules/file-signature.md)
- [method-signature.md](../rules/method-signature.md)
- [accuracy.md](../rules/accuracy.md)

Their definitions and formats are authoritative.

## Authorization boundary

Install Semark only in the repository or packages that the user places in scope. Do
not rewrite source comments or write semantic signatures unless the user requests that
migration work.

## Workflow

1. Inspect the root README, package layout, package manager, and existing TSDoc tools.
2. Locate the instruction files that the installation must update.
3. Identify applicable TypeScript files and explicit exclusions.
4. Record the initial migration scope before you change enforcement.
5. Add the `@semarkFile` TSDoc configuration.
6. Add repository-local validation that fits the existing toolchain.
7. Add a package script or documented command for the Semark check.
8. Add the Semark check to the existing continuous integration workflow.
9. Add missing root or package README files within the requested scope.
10. Add the required Semark policy to `AGENTS.md`.
11. Configure approved directive patterns and stable path exclusions.

If the repository has no continuous integration workflow, report that limitation. Do
not create a new continuous integration system unless the user requests it.

## Required repository instructions

Add this section to the applicable `AGENTS.md` file. Replace the check-command
placeholder with the configured Semark command.

```markdown
## Semark Protocol

Load `semark-protocol` before you add or change TypeScript comments.
Do not add or keep source comments except Semark file signatures, method signatures,
and approved directives.
Update an affected signature in the same change as the documented behavior.
Run `<semark-check-command>` before you complete a change.
```

Keep this policy in `AGENTS.md` as the canonical agent instruction. If the repository
uses other agent instruction files, link them to `AGENTS.md` or add an equivalent
policy. Do not weaken a stricter existing comment rule.

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
The tool must reject unauthorized comments and invalid directives.

The check must return a nonzero status for violations. It must report the file, source
location, and violation type. It must not write descriptions.

## Completion report

Report the changed files, agent instruction paths, scope, exclusions, migration
baseline, check command, continuous integration status, and check results. Report
migration work that remains outside the user request.
