# Prevents cross import usage

## Rule Details

This rule can restrict imports inside a monorepo. For instance you have the folowing structure:
```
packages:
|_package1
|_package2
|_shared
```
You can use this rule to forbid imports from `package1` to `package2`;

### Example:
Let's consider we have this configuration in `.eslintrc`:

```json
{
  "plugins": ["cross-import"],
  "rules": {
    "cross-import/no-cross-import": ["error",
      {"scopeRegex":  "\\bpackages\\/(?<scope>.*?)\\/", "allow": ["shared"]}
    ]
  }
}
```

Imports from `package1` to `package2` will raise the error. But import from `shared`. It is important to use a named capture group in `scopeRegex` to define the scope.

### The following patterns are considered as errors:

Consider the folowing file is `packages/package1/lib.js`:

```js
import b from 'packages/package2/lib/js'
```

## Options
### *scopeRegex*: string (is required)
Regular expression which must contain `scope` named grop. This is how the restricted scope is defined.

### allow: string[]
An array of allowed scopes (namesaces).
