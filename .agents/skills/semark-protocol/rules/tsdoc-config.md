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

The repository can add other TSDoc settings. It must preserve this tag definition and
support setting.
