# eslint-plugin-deprecate

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-deprecate.svg)](https://www.npmjs.com/package/eslint-plugin-deprecate)

This plugin helps you to refactor your codebase.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-cross-import`:

```
$ npm install eslint-plugin-cross-import --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-deprecate` globally.

## Usage

Add `cross-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "cross-import"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "cross-import/rule-name": 2
    }
}
```

## Supported Rules

* [cross-import/no-cross-import](docs/rules/no-cross-import.md): Forbids cross import usage
