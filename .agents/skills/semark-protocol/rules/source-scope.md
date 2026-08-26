# Source scope

Apply Semark to hand-authored `.ts`, `.tsx`, `.mts`, and `.cts` files. This scope
includes source files, tests, build scripts, and TypeScript configuration files.

Exclude these files by default:

- declaration-only `.d.ts` files
- generated files with an approved generated-file marker
- vendored source that the repository does not maintain
- fixtures whose comments are test data

A repository can define more exclusions in its Semark configuration. Each exclusion
must use a stable path rule and a concise reason.
