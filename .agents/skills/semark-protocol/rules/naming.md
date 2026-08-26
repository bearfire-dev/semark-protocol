# Naming protocol

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
