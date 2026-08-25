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
| `.agents/skills/semark-protocol/` | Defines the canonical protocol and signature formats. |
| `.agents/skills/semark-protocol-install/` | Installs Semark in a TypeScript repository. |
| `.agents/skills/semark-protocol-audit/` | Audits a repository for protocol violations. |
| `.agents/skills/semark-protocol-file-write/` | Writes or updates one file signature. |
| `.agents/skills/semark-protocol-method-write/` | Writes or updates callable signatures. |
| `scripts/check.sh` | Checks this repository and validates each skill package. |

The canonical skill is the single source of truth. Operational skills reference it
and do not redefine its formats.

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

Load `semark-protocol` when work requires the canonical rules. Load one operational
skill when work requires installation, an audit, or signature changes.

This repository contains the initial protocol and skill definitions. It does not yet
publish a standalone validator package.

## Check

Run the repository check from the repository root:

```bash
./scripts/check.sh
```

## License

Semark Protocol uses the [MIT License](LICENSE).
