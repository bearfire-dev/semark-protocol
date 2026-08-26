# Validation

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

Each Semark installation must check unauthorized comments and invalid directives in the
configured source scope.

Agents must run the configured Semark check before they complete a change. They must
correct violations that their change causes.
