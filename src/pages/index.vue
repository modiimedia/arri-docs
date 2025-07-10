<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>

<template>
    <div>
        <Header />
        <section class="py-20">
            <div class="container px-4">
                <h1 class="max-w-2xl pb-4 text-6xl">
                    End-to-end type safety has never been easier
                </h1>
                <p class="max-w-2xl pb-8 text-xl">
                    Arri is a code-first, language agnostic, and transport
                    agnostic remote procedure call (RPC) framework for building
                    easy to use APIs.
                </p>
                <button
                    class="rounded-lg bg-yellow-500 px-6 py-4 text-black hover:bg-yellow-400"
                >
                    Get Started
                </button>
                <div class="pt-4">
                    <div
                        class="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 pr-2 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <pre class="p-4">npx arri init [project-name]</pre>
                        <button
                            class="rounded-lg bg-transparent fill-black p-2 hover:bg-gray-200 dark:fill-white dark:hover:bg-gray-700"
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
                    <p>
                        With Arri, there are no DSLs or service schemas to
                        define. You define your API in code and get instant
                        type-safe endpoints. There are no stubs to implement or
                        additional codegen steps. This makes your server code
                        the source of truth for all of your types and
                        procedures.
                    </p>
                </div>

                <div class="flex pt-10">
                    <div class="flex-grow">
                        <h3 class="pb-4 text-2xl">Server</h3>
                        <div
                            class="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800"
                        >
                            <select
                                id=""
                                name=""
                                class="mb-4 rounded border border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <option value="go">go</option>
                                <option value="typescript">typescript</option>
                            </select>
                            <pre>
func main() {
 app := arri.NewApp[any]()
 arri.Rpc(&app, SayHello, arri.RpcOptions{})
 app.Start()
}

type SayHelloParams struct {
  Name string
}

type SayHelloResponse struct {
  Message string
}

func SayHello(
  params SayHelloParams,
  req arri.Request[any],
) (SayHelloResponse, arri.RpcError) {
  return SayHelloResponse{
    Message: “hello “ + params.Name
  }, nil
}
</pre
                            >
                        </div>
                    </div>

                    <div class="w-8" />
                    <div class="h-full">
                        <h3 class="pb-4 text-2xl">Client</h3>
                        <div
                            class="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800"
                        >
                            <select
                                id=""
                                name=""
                                class="mb-4 rounded border border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
                            >
                                <option value="typescript">typescript</option>
                            </select>
                            <pre>
const client = new Client();

const result = await client
    .sayHello({
        name: “John Doe”
    });

console.log(result) // hello John Doe
</pre
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
