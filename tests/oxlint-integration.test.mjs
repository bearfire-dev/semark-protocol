import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const oxlintPath = join(repositoryRoot, "node_modules", ".bin", "oxlint");
const pluginPath = join(repositoryRoot, "dist", "index.js");

async function createConsumer(source, filename = "source.ts") {
  const directory = await mkdtemp(join(tmpdir(), "oxlint-plugin-semark-"));
  const sourcePath = join(directory, filename);
  const configPath = join(directory, ".oxlintrc.json");

  await writeFile(sourcePath, source);
  await writeFile(
    configPath,
    JSON.stringify({
      jsPlugins: [pluginPath],
      rules: {
        "semark/valid": "error",
      },
    }),
  );

  return { configPath, directory, sourcePath };
}

function runOxlint(consumer) {
  return spawnSync(oxlintPath, ["-c", consumer.configPath, consumer.sourcePath], {
    cwd: consumer.directory,
    encoding: "utf8",
  });
}

const validSource = `/**
 * Supplies a test greeting.
 *
 * @remarks
 * Responsibility: Owns construction of the test greeting.
 *
 * Boundary: Accepts a name and does not write external state.
 */

/**
 * Creates a greeting for one person.
 *
 * @param name - The person name in the greeting.
 * @returns The complete greeting.
 */
export function createGreeting(name: string): string {
  return \`Hello, \${name}.\`;
}
`;

test("accepts a valid Semark source file", async () => {
  const consumer = await createConsumer(validSource);

  try {
    const result = runOxlint(consumer);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("reports a missing file signature", async () => {
  const consumer = await createConsumer("export const value = 1;\n");

  try {
    const result = runOxlint(consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /FILE_SIGNATURE_MISSING/u);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("reports the prohibited @semarkFile tag", async () => {
  const source = validSource.replace(
    " * Boundary: Accepts a name and does not write external state.\n */",
    " * Boundary: Accepts a name and does not write external state.\n *\n * @semarkFile\n */",
  );
  const consumer = await createConsumer(source);

  try {
    const result = runOxlint(consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /FILE_SIGNATURE_FORMAT/u);
    assert.match(result.stdout + result.stderr, /Use only @remarks/u);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("reports a missing method signature", async () => {
  const source = validSource.replace(
    /\/\*\*[\s\S]*?Creates a greeting[\s\S]*?\*\/\n/u,
    "",
  );
  const consumer = await createConsumer(source);

  try {
    const result = runOxlint(consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /METHOD_SIGNATURE_MISSING/u);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("reports an unauthorized source comment", async () => {
  const source = validSource.replace(
    "  return",
    "  // This narrative comment is not permitted.\n  return",
  );
  const consumer = await createConsumer(source);

  try {
    const result = runOxlint(consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /COMMENT_UNAUTHORIZED/u);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("accepts an approved Oxlint directive", async () => {
  const source = validSource.replace(
    "  return",
    "  // oxlint-disable-next-line no-template-curly-in-string\n  return",
  );
  const consumer = await createConsumer(source);

  try {
    const result = runOxlint(consumer);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("reports invalid method tag order", async () => {
  const source = validSource.replace(
    " * @param name - The person name in the greeting.\n * @returns The complete greeting.",
    " * @returns The complete greeting.\n * @param name - The person name in the greeting.",
  );
  const consumer = await createConsumer(source);

  try {
    const result = runOxlint(consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /TAG_ORDER_INVALID/u);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("reports invalid TSDoc syntax", async () => {
  const source = validSource.replace(
    "@param name - The person name in the greeting.",
    "@param name The person name in the greeting.",
  );
  const consumer = await createConsumer(source);

  try {
    const result = runOxlint(consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout + result.stderr, /TSDOC_INVALID/u);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("skips declaration-only TypeScript files", async () => {
  const consumer = await createConsumer(
    "export declare function createGreeting(name: string): string;\n",
    "source.d.ts",
  );

  try {
    const result = runOxlint(consumer);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  } finally {
    await rm(consumer.directory, { recursive: true, force: true });
  }
});

test("exports the Oxlint plugin and recommended rule", async () => {
  const module = await import("../dist/index.js");

  assert.equal(module.default.meta.name, "semark");
  assert.ok(module.default.rules.valid);
  assert.deepEqual(module.recommendedRules, { "semark/valid": "error" });
});
