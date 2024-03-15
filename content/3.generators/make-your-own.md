## Scaffolding a Plugin

The Arri CLI comes with a command to initialize a generator project.

```bash
npx arri init <dir> --type plugin
```

This will setup a minimal project to help you get started in creating a generator that can be published as a standalone package.

## Manually Creating a Generator

If you want to manually create a generator or you want to add it to your existing project you will need to install the `arri-codegen-utils` package

::code-group

```bash [pnpm]
pnpm install --save-dev arri-codegen-utils
```

```bash [npm]
npm install --save-dev arri-codegen-utils
```

::

Once installed you can create a your generator using the `defineClientGeneratorPlugin` helper.

```ts
// example-generator.ts

import { defineClientGeneratorPlugin } from 'arri-codegen-utils';

interface MyOptions {
    // add any fields here that your generator takes as options
    option1: string;
    option2: string;
}

export default defineClientGeneratorPlugin(options: MyOptions) {
    generator: (def) => {
        // use the app definition to generate some code
    },
    options,
}
```

Now all you need to do is register your generator in the Arri config file

```ts
// arri.config.ts

import { defineConfig } from 'arri';
import exampleGenerator from './example-generator.ts';

export default defineConfig({
    generators: [
        exampleGenerator({
            option1: 'hello',
            option2: 'world',
        }),
    ],
});
```

## Additional Helpers

`arri-codegen-utils` includes a number helper functions that are useful for code generation. They are as follows:

-   SCHEMA_VERSION
-   camelCase()
-   snakeCase()
-   pascalCase()
-   flatCase()
-   kebabCase()
-   trainCase()
-   titleCase()
-   isUppercase()
-   splitByCase()
-   removeDisallowedChars()
-   isSchema()
-   isSchemaFormEmpty()
-   isSchemaFormType()
-   isSchemaFormEnum()
-   isSchemaFormProperties()
-   isSchemaFormElements()
-   isSchemaFormValues()
-   isSchemaFormDiscriminator()
-   isSchemaFormRef()
-   isRpcDefinition()
-   isServiceDefinition()
-   unflattenObject()
-   unflattenProcedures()
-   setNestedObjectProperty()
