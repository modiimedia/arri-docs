<script setup lang="ts">
import CodeBlock from '~/components/CodeBlock.vue';
import Header from '~/components/Header.vue';

const serverCodeOptions = ['go', 'typescript'] as const;

const serverCode: Record<(typeof serverCodeOptions)[number], string> = {
    go: `func main() {
    app := arri.NewApp[any]()
    arri.Rpc(&app, SayHello, arri.RpcOptions{})
    app.Start()
}

type SayHelloInput struct {
    Name string
}

type SayHelloOutput struct {
    Message string
}

func SayHello(
    input SayHelloInput,
    req arri.Request[any],
) (SayHelloOutput, arri.RpcError) {
    return SayHelloOutput{
        Message: “hello “ + input.Name
    }, nil
}`,
    typescript: `import { a } from '@arrirpc/schema';
import { ArriApp, defineRpc } from '@arrirpc/server';

const app = new ArriApp();

app.rpc('sayHello', defineRpc({
    input: a.object('SayHelloInput', {
        name: a.string(),
    }),
    output: a.object('SayHelloOutput', {
        message: a.string(),
    }),
    handler({ input }) {
        return {
            message: \`hello \${input.name}\`,
        };
    }
}));

export default app;`,
};
const selectedServer = ref<(typeof serverCodeOptions)[number]>('go');

const clientCodeOptions = [
    'typescript',
    'dart',
    'kotlin',
    'swift',
    'rust',
    'CURL',
] as const;
const clientCode: Record<(typeof clientCodeOptions)[number], string> = {
    typescript: `const client = new Client({ baseUrl: 'https://example.com' });
const result = await client.sayHello({ name: 'John Doe' });
console.log(result);`,
    dart: `final client = Client(baseUrl: "https://example.com");
final result = await client.sayHello(
    SayHelloInput(name: "John Doe"),
);
print(result);`,
    kotlin: '',
    swift: '',
    rust: `let client = Client::create(
    ArriClientConfig {
        http_client: reqwest::Client::new(),
        base_url: String::from("https://example.com"),
        headers: Hashmap::new(),
    }
);
let result = client.say_hello(
    SayHelloInput{
        name: String::from("John Doe"),
    }
).await;
println!("{:?}", result);
`,
    CURL: `curl -X POST https://example.com/say-hello \\
  --data '{"name":"John Doe"}'`,
};

const selectedClient = ref<(typeof clientCodeOptions)[number]>('typescript');
</script>

<template>
    <div>
        <Header />
        <section class="py-20">
            <div class="container px-4">
                <h1 class="max-w-2xl pb-4 text-6xl">
                    End-to-end type safety has never been easier
                </h1>
                <p
                    class="max-w-2xl pb-8 text-xl text-gray-600 dark:text-gray-400"
                >
                    Arri is a code-first, language agnostic, and transport
                    agnostic remote procedure call (RPC) framework for building
                    easy to use APIs.
                </p>
                <button
                    class="rounded-lg bg-amber-500 px-6 py-4 text-black hover:bg-amber-400"
                >
                    Get Started
                </button>
                <div class="pt-4">
                    <div
                        class="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 pr-2 dark:border-gray-800 dark:bg-gray-900"
                    >
                        <pre class="p-4">npx arri init [project-name]</pre>
                        <button
                            class="rounded-lg bg-transparent fill-black p-2 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="inherit"
                            >
                                <path
                                    d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <!-- <section class="py-20">
            <div class="container px-4">
                <h2 class="text-3xl pb-4">Use Your Favorite Languages</h2>
                <p>
                    Arri RPC can be implemented in any language for both clients
                    and servers. Use one of our official implemenations or make
                    your own.
                </p>
                <div class="flex" />
            </div>
        </section> -->
        <!-- <section class="pt-0 pb-20">
            <div class="container px-4">
                <div class="flex flex-wrap -m-4">
                    <div class="w-1/3 p-4">
                        <div
                            class="dark:bg-gray-800 border dark:border-gray-700 bg-gray-100 border-gray-200 rounded-lg p-4"
                        >
                            <div class="font-bold text-lg">Easy To Use</div>
                            <div>
                                Arri comes with first party support for a number
                                of languages with the ability to add custom
                                language implementations as needed.
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3 p-4">
                        <div
                            class="dark:bg-gray-800 border dark:border-gray-700 bg-gray-100 border-gray-200 rounded-lg p-4"
                        >
                            <div class="font-bold text-lg">
                                Bring Your Favorite Language
                            </div>
                            <div>
                                Arri comes with first party support for a number
                                of languages with the ability to add custom
                                language implementations as needed.
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3 p-4">
                        <div
                            class="dark:bg-gray-800 border dark:border-gray-700 bg-gray-100 border-gray-200 rounded-lg p-4"
                        >
                            <div class="font-bold text-lg">
                                Incrementally Adoptable and Extensible
                            </div>
                            <div>
                                Since Arri works with HTTP and Websockets it can
                                easily be embedded it into existing
                                applications.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <section class="py-20">
            <div class="container px-4">
                <div class="max-w-4xl">
                    <h2 class="pb-4 text-3xl">Code-First API Development</h2>
                    <p class="text-gray-600 dark:text-gray-400">
                        With Arri, there are no DSLs or service schemas to
                        define. You define your API in code and get instant
                        type-safe endpoints. There are no stubs to implement or
                        additional codegen steps. This makes your server code
                        the source of truth for all of your types and
                        procedures.
                    </p>
                </div>

                <div class="flex flex-col pt-10 lg:flex-row">
                    <div class="pb-4 lg:w-1/2 lg:pb-0 lg:pr-4">
                        <div class="flex justify-between">
                            <h3 class="pb-4 pr-4 text-2xl">Server</h3>
                            <select
                                id=""
                                v-model="selectedServer"
                                name=""
                                class="mb-4 rounded border border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-900"
                            >
                                <option value="go">go</option>
                                <option value="typescript">typescript</option>
                            </select>
                        </div>

                        <CodeBlock
                            v-for="val in serverCodeOptions"
                            :key="val"
                            :lang="val"
                            :code="serverCode[val]"
                            :class="{
                                hidden: val !== selectedServer,
                            }"
                        />
                    </div>

                    <div class="h-full pt-4 lg:w-1/2 lg:pl-4 lg:pt-0">
                        <div class="flex justify-between">
                            <h3 class="pb-4 pr-4 text-2xl">Client</h3>
                            <select
                                id=""
                                v-model="selectedClient"
                                name=""
                                class="mb-4 rounded border border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-900"
                            >
                                <option
                                    v-for="option in clientCodeOptions"
                                    :key="`client_${option}`"
                                    :value="option"
                                >
                                    {{ option }}
                                </option>
                            </select>
                        </div>

                        <CodeBlock
                            v-for="val in clientCodeOptions"
                            :key="`client_code_${val}`"
                            :code="clientCode[val] ?? ''"
                            :lang="val === 'CURL' ? 'sh' : val"
                            :class="{
                                hidden: val !== selectedClient,
                            }"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
