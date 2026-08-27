# Semark Protocol

Semark is an agent-first documentation protocol for TypeScript repositories. It puts
concise TSDoc signatures at file and callable boundaries. Descriptive names and local
README files guide discovery without a generated code graph, external knowledge store,
or agent-specific context system.

## Install

```bash
bunx skills add bearfire-dev/semark-protocol
```

Then give your agent this prompt:

```text
Use the installed semark-protocol skill to set up Semark Protocol in this repository.
Apply it to all TypeScript packages. Migrate all applicable files. Add the validation
check to CI. Run all required checks.
```

## How it works

Semark uses a fixed discovery path:

```text
Repository instructions
    -> Repository README
    -> Package README
    -> File signature
    -> Method signature
    -> Implementation and tests
```

Each level narrows the next search. Repository instructions define workflows and
checks. README files describe scope, ownership, and package relationships. File
signatures state responsibility and boundaries. Method signatures state callable
behavior, inputs, results, constraints, and effects.

The protocol permits only Semark signatures and recognized tool directives in source
comments. Its Oxlint plugin checks structure, placement, syntax, order, and length.
Agents and reviewers remain responsible for semantic accuracy and clear names.

### Example package

```text
packages/
└── sessions/
    ├── README.md
    ├── package.json
    ├── src/
    │   ├── create-session.ts
    │   └── index.ts
    └── tests/
        └── create-session.test.ts
```

The package README defines the `sessions` package boundary. Each source file then
documents only the responsibility and behavior that it owns.

```ts
/**
 * Creates session records for authenticated identities.
 *
 * @remarks
 * Responsibility: Owns session-record construction.
 *
 * Boundary: Accepts an identity ID and does not verify the identity.
 */

export interface Session {
  id: string;
  identityId: string;
}

/**
 * Creates a session record for one authenticated identity.
 *
 * @param identityId - The authenticated identity that owns the session.
 * @returns A new session record.
 */
export function createSession(identityId: string): Session {
  return { id: crypto.randomUUID(), identityId };
}
```

---

Copyright © 2026 Slate Rehm. Released under the [MIT License](LICENSE).
