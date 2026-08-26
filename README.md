# Semark Protocol

Semark Protocol is an agent-first documentation protocol for TypeScript codebases.
It keeps repository knowledge concise, local, human-readable, and machine-readable.
Agents use normal shell and file tools to discover only the context that a task needs.

## Discovery model

Semark organizes context in this order:

```text
Repository instructions
    -> Repository README
    -> Package README
    -> File signature
    -> Method signature
    -> Implementation and tests
```

Names supply the first discovery layer. Standardized TSDoc signatures add semantic
context at file and callable boundaries. Scripts check the protocol structure but do
not write semantic descriptions.

Semark does not require a generated code graph, external knowledge store, repository
index, language-server replacement, or harness-specific context injection.

## Repository map

| Path | Responsibility |
| --- | --- |
| `.agents/skills/semark-protocol/SKILL.md` | Routes all Semark work. |
| `.agents/skills/semark-protocol/references/` | Defines install, audit, and signature workflows. |
| `.agents/skills/semark-protocol/rules/` | Defines the canonical protocol rules. |
| `src/` | Implements the published Oxlint plugin. |
| `tests/` | Tests the plugin through the Oxlint command-line interface. |
| `scripts/check.sh` | Checks this repository and validates each skill package. |

Semark Protocol uses one skill. Its entry point routes each request to the applicable
workflow and rule modules. The rule modules are the single source of truth.

## Protocol boundaries

- `AGENTS.md` defines agent workflows and repository rules.
- The root `README.md` maps the complete repository.
- Each package or application contains exactly one `README.md`.
- File signatures describe file responsibility and boundaries.
- Method signatures describe callable behavior.
- Approved directives cover compiler, tooling, license, and generated-code needs.
- Other source comments are not part of the protocol.

The protocol requires descriptive, domain-specific names. Signatures supplement
names. They do not replace them.

## Use

Load `semark-protocol` for all Semark work. Read only the workflow and rule modules that
its route identifies.

Configure npm to use the GitHub Packages registry for the `@bearfire-dev` scope:

```ini
@bearfire-dev:registry=https://npm.pkg.github.com
```

Add this credential mapping to the user-level `~/.npmrc` file. Pnpm does not use
credentials from a committed project `.npmrc` file.

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Set `NODE_AUTH_TOKEN` to a GitHub personal access token (classic) with
`read:packages` permission. Then install the Oxlint plugin in a TypeScript repository:

```bash
npm install --save-dev oxlint @bearfire-dev/oxlint-plugin-semark
```

Load the plugin and enable its rule in the root `.oxlintrc.json` file:

```json
{
	"jsPlugins": ["@bearfire-dev/oxlint-plugin-semark"],
	"rules": {
		"semark/valid": "error"
	}
}
```

The plugin checks file signatures, method signatures, TSDoc syntax, length limits, tag
order, and approved source comments. Agents and reviewers remain responsible for semantic
accuracy, naming quality, README coverage, and migration scope.

The package uses TypeScript 7 for its build. Oxlint loads the compiled JavaScript plugin
through its `jsPlugins` configuration.

The package requires Oxlint 1.80.0 or later in the 1.x release line. Oxlint currently
marks its JavaScript plugin API as alpha, so pin Oxlint in production repositories.

The package is available only from GitHub Packages. A GitHub release publishes the
matching package version with the repository `GITHUB_TOKEN`.

## Check

Install the package dependencies. Then run the repository check from the repository root:

```bash
npm install
./scripts/check.sh
```

## License

Semark Protocol uses the [MIT License](LICENSE).
