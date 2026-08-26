# Documentation boundaries

## Repository instructions

`AGENTS.md` defines agent workflows, validation commands, repository conventions, and
Semark responsibilities. It must not be the primary architecture document.

`AGENTS.md` must tell agents to load `semark-protocol` before they add or change
TypeScript comments. It must prohibit source comments except Semark signatures and
approved directives. It must include the configured Semark check command.

Keep `AGENTS.md` as the canonical agent instruction. Link harness-specific instruction
files to it when the repository supports links. Otherwise, add an equivalent policy to
each instruction file that the repository uses.

## Root README

The root contains one `README.md`. It defines the repository purpose, major packages,
architectural boundaries, package relationships, primary commands, and discovery entry
points.

Keep it as a concise repository map. Do not put detailed package or source behavior in
it.

## Package README

Each package or application contains exactly one `README.md`. It defines the package
purpose, responsibilities, boundaries, relationships, organization, public role, and
relevant commands.

Do not add other general-purpose Markdown documents. A repository can explicitly allow
machine configuration, contribution forms, security policy files, or generated reports.

## Skills

Skills define repeatable agent behavior. They must not store general codebase memory or
duplicate package architecture.
