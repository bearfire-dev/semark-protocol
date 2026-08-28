import { spawnSync } from "node:child_process";
import { lstat, readFile, readdir, readlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = dirname(dirname(scriptPath));
const skills = ["semark-protocol"];

function displayPath(root, path) {
  return relative(root, path).split(sep).join("/");
}

async function pathExists(path) {
  try {
    await lstat(path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

export async function validateRequiredSymlink(
  root,
  relativePath,
  expectedTarget,
) {
  const path = join(root, relativePath);
  let metadata;

  try {
    metadata = await lstat(path);
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw new Error(`${relativePath} must be a symbolic link to ${expectedTarget}.`);
    }

    throw error;
  }

  if (!metadata.isSymbolicLink()) {
    throw new Error(`${relativePath} must be a symbolic link to ${expectedTarget}.`);
  }

  const target = await readlink(path);
  if (normalize(target) !== normalize(expectedTarget)) {
    throw new Error(`${relativePath} must link to ${expectedTarget}.`);
  }
}

async function collectFiles(path) {
  const metadata = await lstat(path);
  if (!metadata.isDirectory()) {
    return [path];
  }

  const entries = await readdir(path);
  const files = [];

  for (const entry of entries) {
    files.push(...(await collectFiles(join(path, entry))));
  }

  return files;
}

export async function findPlaceholders(root, paths) {
  const matches = [];

  for (const path of paths) {
    for (const filePath of await collectFiles(join(root, path))) {
      const lines = (await readFile(filePath, "utf8")).split(/\r?\n/u);

      for (const [index, line] of lines.entries()) {
        if (/\[TODO|TODO:/u.test(line)) {
          matches.push({
            line,
            lineNumber: index + 1,
            path: displayPath(root, filePath),
          });
        }
      }
    }
  }

  return matches;
}

function pythonLaunchers() {
  if (process.platform === "win32") {
    return [
      { args: ["-3"], command: "py" },
      { args: [], command: "python" },
      { args: [], command: "python3" },
    ];
  }

  return [
    { args: [], command: "python3" },
    { args: [], command: "python" },
    { args: ["-3"], command: "py" },
  ];
}

function findPython3() {
  for (const launcher of pythonLaunchers()) {
    const result = spawnSync(
      launcher.command,
      [
        ...launcher.args,
        "-c",
        "import sys; raise SystemExit(sys.version_info.major != 3)",
      ],
      { stdio: "ignore" },
    );

    if (!result.error && result.status === 0) {
      return launcher;
    }

    if (result.error && result.error.code !== "ENOENT") {
      throw result.error;
    }
  }

  throw new Error("The skill creator validator requires Python 3.");
}

function runSkillValidator(validatorPath, skillPath) {
  const launcher = findPython3();
  const result = spawnSync(
    launcher.command,
    [...launcher.args, validatorPath, skillPath],
    { stdio: "inherit" },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `The skill creator validator failed with status ${result.status}.`,
    );
  }
}

async function validateSkill(root, skillCreatorRoot, skill) {
  const skillPath = join(root, ".agents", "skills", skill);
  const skillFilePath = join(skillPath, "SKILL.md");

  if (!(await pathExists(skillFilePath))) {
    throw new Error(`The ${skill} skill needs SKILL.md.`);
  }

  const skillFile = await readFile(skillFilePath, "utf8");
  if (!skillFile.split(/\r?\n/u).includes(`name: ${skill}`)) {
    throw new Error(`The ${skill} frontmatter name is incorrect.`);
  }

  const validatorPath = join(skillCreatorRoot, "scripts", "quick_validate.py");
  if (await pathExists(validatorPath)) {
    runSkillValidator(validatorPath, skillPath);
  }
}

export async function checkRepository(root = repositoryRoot) {
  await validateRequiredSymlink(root, "CLAUDE.md", "AGENTS.md");
  await validateRequiredSymlink(
    root,
    join(".claude", "skills"),
    join("..", ".agents", "skills"),
  );

  const placeholders = await findPlaceholders(root, [
    "README.md",
    "AGENTS.md",
    join(".agents", "skills"),
  ]);

  if (placeholders.length > 0) {
    for (const match of placeholders) {
      console.error(`${match.path}:${match.lineNumber}:${match.line}`);
    }

    throw new Error("Remove all scaffold placeholders.");
  }

  const skillCreatorRoot = join(
    process.env.CODEX_HOME ?? join(homedir(), ".codex"),
    "skills",
    ".system",
    "skill-creator",
  );

  for (const skill of skills) {
    await validateSkill(root, skillCreatorRoot, skill);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  try {
    await checkRepository();
    console.log("Repository structure checks passed.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
