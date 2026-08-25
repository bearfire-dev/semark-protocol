#!/usr/bin/env bash

set -euo pipefail

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
skill_creator_root="${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-creator"
skills=(
	semark-protocol
	semark-protocol-install
	semark-protocol-audit
	semark-protocol-file-write
	semark-protocol-method-write
)

cd "$repository_root"

if [[ ! -L CLAUDE.md || "$(readlink CLAUDE.md)" != "AGENTS.md" ]]; then
	echo "CLAUDE.md must link to AGENTS.md." >&2
	exit 1
fi

if [[ ! -L .claude/skills || "$(readlink .claude/skills)" != "../.agents/skills" ]]; then
	echo ".claude/skills must link to ../.agents/skills." >&2
	exit 1
fi

if rg -n '\[TODO|TODO:' README.md AGENTS.md .agents/skills; then
	echo "Remove all scaffold placeholders." >&2
	exit 1
fi

for skill in "${skills[@]}"; do
	skill_path=".agents/skills/$skill"

	if [[ ! -f "$skill_path/SKILL.md" ]]; then
		echo "The $skill skill needs SKILL.md." >&2
		exit 1
	fi

	if ! rg -q "^name: $skill$" "$skill_path/SKILL.md"; then
		echo "The $skill frontmatter name is incorrect." >&2
		exit 1
	fi

	if [[ -f "$skill_creator_root/scripts/quick_validate.py" ]]; then
		python3 "$skill_creator_root/scripts/quick_validate.py" "$skill_path"
	fi
done

echo "All repository checks passed."
