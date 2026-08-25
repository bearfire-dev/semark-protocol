---
name: semark-protocol
description: Apply the canonical Semark documentation protocol to TypeScript repositories. Use for Semark rules, discovery, naming, TSDoc formats, comment policy, or compliance decisions.
---

# Semark Protocol

Semark Protocol makes repository knowledge progressively discoverable. The repository
stores the context. Agents use normal shell and file operations to retrieve it.

Use this skill as the single source of truth. Operational Semark skills must read this
file before they change a repository.

## Purpose

Semark documentation must be:

- concise
- local to the documented code
- human-readable
- machine-readable
- independent of agent memory
- independent of harness-specific context injection
- accessible through normal shell and file operations

Semark does not require a code graph, repository index, external knowledge store, or
language-server replacement.

## Discovery hierarchy

Use this fixed hierarchy:

```text
Repository instructions
    -> Repository README
    -> Package README
    -> File signature
    -> Method signature
    -> Implementation and tests
```

Start with the smallest relevant context surface. Inspect the next level only when the
current level does not supply enough information.

Use tools such as `ls`, `find`, `rg`, `head`, `sed`, `cat`, and `git`. Do not read a
complete package when its README excludes that package from the task.

## Documentation boundaries

### Repository instructions

`AGENTS.md` defines agent workflows, validation commands, repository conventions, and
Semark responsibilities. It must not be the primary architecture document.

### Root README

The root contains one `README.md`. It defines the repository purpose, major packages,
architectural boundaries, package relationships, primary commands, and discovery entry
points.

Keep it as a concise repository map. Do not put detailed package or source behavior in
it.

### Package README

Each package or application contains exactly one `README.md`. It defines the package
purpose, responsibilities, boundaries, relationships, organization, public role, and
relevant commands.

Do not add other general-purpose Markdown documents. A repository can explicitly allow
machine configuration, contribution forms, security policy files, or generated reports.

### Skills

Skills define repeatable agent behavior. They must not store general codebase memory or
duplicate package architecture.

## Naming protocol

Use explicit, domain-specific names for files, directories, variables, callables,
classes, types, and interfaces.

A name must communicate the represented entity, operation, domain responsibility, and
important distinction from similar concepts. Avoid generic names when a precise name is
available.

Avoid names such as `util.ts`, `helper.ts`, `manager.ts`, `processor.ts`, `data`,
`value`, `item`, `handle`, `run`, and `process`.

Prefer names such as `create-authenticated-session.ts`, `verify-access-token.ts`,
`sessionRepository`, `authenticatedIdentity`, `createSession`, and `verifyCredential`.

Signatures supplement names. They do not compensate for weak names.

## Source scope

Apply Semark to hand-authored `.ts`, `.tsx`, `.mts`, and `.cts` files. This scope
includes source files, tests, build scripts, and TypeScript configuration files.

Exclude these files by default:

- declaration-only `.d.ts` files
- generated files with an approved generated-file marker
- vendored source that the repository does not maintain
- fixtures whose comments are test data

A repository can define more exclusions in its Semark configuration. Each exclusion
must use a stable path rule and a concise reason.

## Approved source comments

Each source comment must be one of these forms:

1. A file signature.
2. A method signature.
3. A recognized compiler, tooling, license, or generated-code directive.

Do not use narrative implementation comments, commented-out code, informal TODO notes,
scratch notes, history, speculation, duplicated documentation, or arbitrary comments.
Track pending work in the repository issue system.

Approved directive categories include:

- TypeScript directives such as `@ts-expect-error` and `@ts-ignore`
- lint directives with the linter's exact syntax
- coverage directives for the configured coverage tool
- formatter directives with the formatter's exact syntax
- license headers
- generated-file markers
- TypeScript triple-slash directives

A directive must use recognizable tool syntax. Add only the explanation that the tool
requires. A directive must not become general documentation.

## TSDoc configuration

Configure `@semarkFile` as a custom TSDoc modifier tag:

```json
{
	"$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
	"tagDefinitions": [
		{
			"tagName": "@semarkFile",
			"syntaxKind": "modifier"
		}
	],
	"supportForTags": {
		"@semarkFile": true
	}
}
```

The repository can add other TSDoc settings. It must preserve this tag definition and
support setting.

## File signatures

Each applicable file starts with one file signature. Put it after an approved shebang,
license header, generated marker, or triple-slash directive. Put it before imports,
exports, declarations, and executable statements.

Use this exact structure:

```ts
/**
 * Creates and persists authenticated sessions.
 *
 * @remarks
 * Responsibility: Owns session construction and persistence.
 *
 * Boundary: Accepts verified identities and does not verify credentials.
 *
 * @semarkFile
 */
```

The first sentence states the file purpose. The `Responsibility:` paragraph states the
behavior that the file owns. The `Boundary:` paragraph states ownership limits and
relevant relationships.

Apply these limits:

- The purpose contains one sentence and at most 25 words.
- Each required paragraph contains at most two sentences and 50 words.
- The complete signature contains at most 120 words.
- Each statement describes one responsibility or boundary.

Do not list imports or exports. Do not include implementation steps, change history,
temporary notes, speculation, or unrelated behavior.

## Method signatures

Add one method signature to each callable implementation with a stable source location.
Coverage includes:

- function declarations
- class methods and constructors
- accessors
- named function expressions
- arrow functions or function expressions assigned to a variable or property
- object methods
- callbacks with a block body
- hooks and exported callables

Do not add a separate signature to an overload declaration without a body. The
implementation signature documents the complete overload behavior. Exclude ambient
declarations and call signatures that contain no implementation.

Put the signature immediately before the callable. Put it before callable decorators.
Do not place other comments between the signature and callable.

Use this structure and omit sections that do not apply:

```ts
/**
 * Creates a session for an authenticated identity.
 *
 * @remarks
 * Side effects: Persists the session before this function returns.
 *
 * Invariant: The identity is verified before this function receives it.
 *
 * @typeParam TIdentity - The verified identity type.
 * @param identity - The identity that owns the session.
 * @param options - The session lifetime and persistence options.
 * @returns The persisted session.
 * @throws {@link SessionPersistenceError} When the repository rejects the write.
 */
```

The summary states concrete behavior. Use `@remarks` only for important facts that the
summary and structural signature do not show.

Remarks can use these labels in this order:

1. `Side effects:`
2. `Invariant:`
3. `Constraint:`
4. `Assumption:`
5. `Interaction:`

Use the tags in this order:

1. `@typeParam`
2. `@param`
3. `@returns`
4. `@throws`
5. `@deprecated`
6. `@example`
7. `@see`

Document each type parameter and runtime parameter. Omit `@returns` for constructors,
setters, and callables that return `void` or `never`. Add one `@throws` tag for each
intentional failure category that can cross the callable boundary.

Apply these limits:

- The summary contains one sentence and at most 25 words.
- Each remarks paragraph contains at most two sentences and 50 words.
- Each parameter, return, or failure description contains at most 30 words.
- The complete signature contains at most 200 words.

Describe behavior, input meaning, result meaning, side effects, failures, invariants,
constraints, assumptions, and non-obvious interactions only when they apply.

## Technical writing

Use active voice, concrete behavior, and consistent domain terms. Use one responsibility
per statement. Distinguish responsibilities from boundaries.

Avoid unnecessary adjectives, implementation narration, repetition, conversational
language, and speculative language. Do not include information that does not help
discovery or implementation.

## Progressive discovery workflow

1. Read the applicable `AGENTS.md` and root `README.md` sections.
2. Locate candidate packages with names, `find`, and `rg`.
3. Read only the relevant package `README.md`.
4. Locate candidate files with filenames and symbol searches.
5. Read the first 40 lines of each candidate file.
6. Read the relevant method signatures.
7. Read complete implementations and tests only when the prior levels show relevance.

## Accuracy

Update a signature in the same change that changes its documented behavior. This rule
includes changes to responsibility, behavior, inputs, results, side effects, failures,
invariants, boundaries, relationships, and public roles.

Source code remains the implementation authority. Treat a missing or inaccurate
signature as a code-quality defect.

## Validation

Validation must return a nonzero status for a violation. It can check:

- root and package README coverage
- exact README names
- file-signature presence and placement
- method-signature presence and placement
- TSDoc syntax and tag order
- signature length limits
- prohibited tags and comments
- directive syntax
- configured source coverage
- changed-code signature updates

Validation must not generate semantic descriptions. Humans and agents write the
descriptions.

Agents must run the configured Semark check before they complete a change. They must
correct violations that their change causes.
