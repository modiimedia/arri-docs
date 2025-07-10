<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>

<template>
    <div>
        <Header />
        <section class="py-20">
            <div class="container px-4">
                <h1 class="text-6xl max-w-2xl pb-8">
                    End-to-end type safety has never been easier
                </h1>
                <button class="px-6 py-4 bg-yellow-500 rounded-lg text-black">
                    Get Started
                </button>
                <div class="pt-4">
                    <div
                        class="rounded-lg border border-gray-700 bg-gray-800 items-center inline-flex pr-2"
                    >
                        <pre class="p-4">npx arri init [project-name]</pre>
                        <button
                            class="p-2 rounded-lg hover:bg-gray-700 bg-transparent"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e8eaed"
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
        <section class="py-20">
            <div class="container px-4">
                <div class="max-w-4xl">
                    <h2 class="text-3xl pb-4">Code-First API Development</h2>
                    <p>
                        With Arri, define your API in code and get instant
                        type-safe endpoints. There are no schemas or
                        specifications. Your server code becomes the source of
                        truth for all of your types and procedures.
                    </p>
                </div>

                <div class="flex pt-10">
                    <div class="flex-grow">
                        <h3 class="pb-4 text-2xl">Server</h3>
                        <div
                            class="p-4 rounded bg-gray-800 border border-gray-700"
                        >
                            <select
                                id=""
                                name=""
                                class="bg-gray-800 mb-4 rounded border border-gray-700 px-4 py-2"
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
                            class="p-4 rounded bg-gray-800 border border-gray-700"
                        >
                            <select
                                id=""
                                name=""
                                class="bg-gray-800 mb-4 rounded border border-gray-700 px-4 py-2"
                            >
                                <option value="typescript">typescript</option>
                            </select>
                            <pre>
const client = new Client();

const result = await client.sayHello(
  { name: “John Doe” }
);

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
