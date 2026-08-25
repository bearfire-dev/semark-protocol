---
name: semark-protocol-audit
description: Audit a TypeScript repository for Semark Protocol compliance. Use for read-only findings about signatures, comments, naming, README coverage, configuration, or changed-code documentation.
---

# Semark Protocol Audit

Read `../semark-protocol/SKILL.md` completely before the audit. Use its current formats,
coverage rules, and limits.

An audit only reports findings unless the user also requests corrections.

## Audit workflow

1. Read all applicable repository instructions.
2. Identify the configured source scope, exclusions, and migration baseline.
3. Run the Semark check when the repository contains one.
4. Locate root and package README files.
5. Inspect applicable source comments and TSDoc blocks.
6. Compare changed code with changed signatures when the audit includes a Git range.
7. Inspect reported naming problems in their domain context.
8. Confirm each finding against the canonical skill.

Do not infer semantic inaccuracy from wording alone. Read the implementation, related
types, callers, or tests when a finding depends on behavior.

## Finding categories

Use these stable categories:

- `README_MISSING`
- `README_NAME_INVALID`
- `FILE_SIGNATURE_MISSING`
- `FILE_SIGNATURE_POSITION`
- `FILE_SIGNATURE_FORMAT`
- `METHOD_SIGNATURE_MISSING`
- `METHOD_SIGNATURE_POSITION`
- `METHOD_SIGNATURE_FORMAT`
- `TSDOC_INVALID`
- `TAG_ORDER_INVALID`
- `LENGTH_LIMIT`
- `COMMENT_UNAUTHORIZED`
- `DIRECTIVE_INVALID`
- `SIGNATURE_STALE`
- `NAME_AMBIGUOUS`
- `CONFIGURATION_INVALID`

## Output

Group findings by file. Give each finding this information:

```text
path:line CATEGORY
Problem: <observed violation>
Required change: <smallest compliant correction>
Evidence: <relevant source or configuration fact>
```

Sort findings by path and source location. Separate confirmed violations from items that
need domain-owner review. Do not report style preferences as protocol violations.

If the audit finds no violations, state the audited scope, command results, and Git
range. Do not claim full compliance outside that scope.
