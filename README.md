# @fnando/use-form

[![](https://github.com/fnando/use-form/workflows/tests/badge.svg)](https://github.com/fnando/use-form/actions?query=workflow%3Atests)

React hooks to handle forms.

## Install

```console
$ yarn add @fnando/use-form
```

or

```console
$ npm install @fnando/use-form
```

## Usage

### Creating a custom rule

Let's create a rule to validate email addresses.

```ts
import { regex, Params, RuleOptions, Validator } from "@fnando/use-form";

export function emailFormat<Params>(
  options?: RuleOptions<Params>,
): Validator<Params> {
  return regex(/^\S+@\S+$/, {
    message: ({ attribute }) => `${attribute} is not a valid email address`,
    ...options,
    type: "emailFormat",
  });
}
```

You can then use this rule on your form.

```ts
import React from "react";
import { useForm } from "@fnando/use-form";
import { emailFormat } from "./emailFormat";

export const App: React.FC = () => {
  const form = useForm(() => ({
    email: [emailFormat()],
  }));

  // ...
};
```

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
