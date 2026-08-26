# Audit Semark compliance

Read only the additional rule modules that cover the requested audit scope. A complete
audit needs all modules in `../rules/` except `purpose.md` and `discovery.md`.

An audit only reports findings unless the user also requests corrections.

## Workflow

1. Identify the configured source scope, exclusions, and migration baseline.
2. Locate the root and package README files.
3. Inspect applicable source comments and TSDoc blocks.
4. Compare changed code with changed signatures when the audit includes a Git range.
5. Inspect reported naming problems in their domain context.
6. Confirm each finding against the applicable rule module.

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

Return one Markdown table. Do not return JSON, YAML, or record-style code blocks. Use
exactly these columns:

| Status | Location | Category | Problem | Required change | Evidence |
| --- | --- | --- | --- | --- | --- |

Use `Confirmed` or `Review` in the `Status` column. Put `path:line` in `Location`. Use
one row for each finding. Escape a pipe character when it occurs in a cell.

Sort confirmed violations before review items. Then sort by path and source location.
Do not report style preferences as protocol violations.

If the audit finds no violations, return the table header with no finding rows. Then
state the audited scope, command results, and Git range. Do not claim full compliance
outside that scope.
