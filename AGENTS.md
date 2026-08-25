# Repository instructions

## Discovery

1. Read `README.md` for the repository map.
2. Read `.agents/skills/semark-protocol/SKILL.md` before a protocol change.
3. Read only the operational skills that the task affects.

The canonical skill is the source of truth for Semark Protocol. Operational skills
must reference its rules instead of copying them.

## Documentation

Use strict Simplified Technical English for documentation. Use active voice and
short sentences. Do not use semicolons.

Keep the root `README.md` concise. Do not add general documentation files outside
the skill packages. Put protocol rules in the canonical skill.

Update an affected operational skill when a canonical rule changes its workflow.
Do not weaken a protocol rule to make a check pass.

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
