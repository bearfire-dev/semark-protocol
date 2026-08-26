# File signatures

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
