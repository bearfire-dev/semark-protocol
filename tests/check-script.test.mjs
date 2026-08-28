import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  findPlaceholders,
  validateRequiredSymlink,
} from "../scripts/check.mjs";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));

test("accepts the repository symbolic links", async () => {
  await validateRequiredSymlink(repositoryRoot, "CLAUDE.md", "AGENTS.md");
  await validateRequiredSymlink(
    repositoryRoot,
    join(".claude", "skills"),
    join("..", ".agents", "skills"),
  );
});

test("rejects a regular file in place of a symbolic link", async () => {
  const directory = await mkdtemp(join(tmpdir(), "semark-check-"));

  try {
    await writeFile(join(directory, "CLAUDE.md"), "AGENTS.md");
    await assert.rejects(
      validateRequiredSymlink(directory, "CLAUDE.md", "AGENTS.md"),
      /must be a symbolic link/u,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("reports scaffold placeholders with source locations", async () => {
  const directory = await mkdtemp(join(tmpdir(), "semark-check-"));

  try {
    await writeFile(join(directory, "README.md"), "Ready.\nTODO: replace me.\n");
    assert.deepEqual(await findPlaceholders(directory, ["README.md"]), [
      {
        line: "TODO: replace me.",
        lineNumber: 2,
        path: "README.md",
      },
    ]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
