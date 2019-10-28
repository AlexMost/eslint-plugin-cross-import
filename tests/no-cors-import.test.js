import { RuleTester } from 'eslint';
import rule from '../lib/rules/no-cross-import';

const options = [{"scopeRegex":  "\\bpackages\\/(?<scope>.*?)\\/", "allow": ["shared"]}];
const parserOptions = { ecmaVersion: 6, sourceType: "module" };
const ruleTester = new RuleTester();
const filename = 'packages/test/some/file.js';

ruleTester.run('no-cross-import', rule, {
    valid: [
        {
            filename,
            code: 'import "jquery"',
            options,
            parserOptions,
        },
        {
            filename,
            code: 'import "packages/shared/file.js"',
            options,
            parserOptions,
        }
    ],
    invalid: [
        {
            code: 'import { Some } from "packages/other/file.js"',
            filename,
            options,
            parserOptions,
            errors: [{ message: `You can't make cross import "other" in "test"` }]
        }
    ]
})