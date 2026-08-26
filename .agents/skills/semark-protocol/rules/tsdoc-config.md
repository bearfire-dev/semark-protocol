# TSDoc configuration

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

Permit other TSDoc settings. Preserve this tag definition and support setting.
