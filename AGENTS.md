# Repository instructions

## Discovery

1. Read `README.md` for the repository map.
2. Read `.agents/skills/semark-protocol/SKILL.md` to route protocol work.
3. Read only the workflow references and rule modules that the task affects.

The rule modules in `.agents/skills/semark-protocol/rules/` are the source of truth for
Semark Protocol. Workflow references identify the rules that each operation needs.

## Documentation

Use `.agents/skills/semark-protocol/rules/writing.md` for documentation in this
repository.

Keep the root `README.md` concise. Do not add general documentation files outside
the skill packages. Put protocol rules in the canonical rule modules.

Update an affected workflow reference when a canonical rule changes its workflow. Do
not weaken a protocol rule to make a check pass.

## Skills

Repository skills live in `.agents/skills/`. The `.claude/skills` path must remain a
symlink to that directory. `CLAUDE.md` must remain a symlink to `AGENTS.md`.

Use the skill initializer for new skills. Validate each changed skill with the skill
creator validator.

## Check command

Run this command after each change:

```bash
./scripts/check.sh
```

The repository has no automatic correction command.
