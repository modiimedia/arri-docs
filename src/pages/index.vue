<script setup lang="ts">
import { ref } from 'vue';
import CodeBlock from '~/components/CodeBlock.vue';
import HeroGraphic from '~/components/HeroGraphic.vue';
import AnimatedPlayground from '~/components/AnimatedPlayground.vue';

definePageMeta({
    layout: 'default',
});

const serverCodeOptions = ['TypeScript', 'Go', 'Rust'] as const;
type ServerLang = (typeof serverCodeOptions)[number];

const serverLangMap: Record<ServerLang, string> = {
    TypeScript: 'typescript',
    Go: 'go',
    Rust: 'rust',
};

const serverCode: Record<ServerLang, { code: string; filename: string }> = {
    TypeScript: {
        filename: 'server.ts',
        code: `import { a } from '@arrirpc/schema';
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
            message: \`Hello \${input.name}!\`,
        };
    }
}));

export default app;`,
    },
    Go: {
        filename: 'main.go',
        code: `package main

import (
    "github.com/modii-dev/arri/languages/go/go-server"
)

type SayHelloInput struct {
    Name string \`json:"name"\`
}

type SayHelloOutput struct {
    Message string \`json:"message"\`
}

func main() {
    app := arri.NewApp[any]()

    arri.Rpc(&app, SayHello, arri.RpcOptions{})

    app.Start()
}

func SayHello(
    input SayHelloInput,
    req arri.Request[any],
) (SayHelloOutput, arri.RpcError) {
    return SayHelloOutput{
        Message: "Hello " + input.Name + "!",
    }, nil
}`,
    },
    Rust: {
        filename: 'main.rs',
        code: `use arri_server::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, ArriSchema)]
struct SayHelloInput {
    name: String,
}

#[derive(Serialize, Deserialize, ArriSchema)]
struct SayHelloOutput {
    message: String,
}

#[tokio::main]
async fn main() {
    let mut app = ArriApp::new();

    app.rpc("sayHello", say_hello);

    app.start().await.unwrap();
}

async fn say_hello(input: SayHelloInput) -> Result<SayHelloOutput, ArriError> {
    Ok(SayHelloOutput {
        message: format!("Hello {}!", input.name),
    })
}`,
    },
};

const clientCodeOptions = [
    'TypeScript',
    'Dart',
    'Rust',
    'Swift',
    'Kotlin',
    'cURL',
] as const;
type ClientLang = (typeof clientCodeOptions)[number];

const clientCode: Record<
    ClientLang,
    { code: string; filename: string; lang: string }
> = {
    TypeScript: {
        filename: 'client.ts',
        lang: 'typescript',
        code: `import { Client } from './generated-client';

const client = new Client({
    baseUrl: 'https://api.example.com'
});

const response = await client.sayHello({ name: 'World' });
console.log(response.message); // "Hello World!"`,
    },
    Dart: {
        filename: 'client.dart',
        lang: 'dart',
        code: `import 'generated_client.dart';

void main() async {
  final client = Client(baseUrl: 'https://api.example.com');

  final response = await client.sayHello(
    SayHelloInput(name: 'World'),
  );
  print(response.message); // "Hello World!"
}`,
    },
    Rust: {
        filename: 'client.rs',
        lang: 'rust',
        code: `use generated_client::{Client, ArriClientConfig, SayHelloInput};

#[tokio::main]
async fn main() {
    let client = Client::new(ArriClientConfig {
        base_url: "https://api.example.com".to_string(),
        ..Default::default()
    });

    let response = client.say_hello(SayHelloInput {
        name: "World".to_string(),
    }).await.unwrap();

    println!("{}", response.message); // "Hello World!"
}`,
    },
    Swift: {
        filename: 'client.swift',
        lang: 'swift',
        code: `import Foundation
import GeneratedClient

let client = Client(baseUrl: "https://api.example.com")

let response = try await client.sayHello(
    input: SayHelloInput(name: "World")
)
print(response.message) // "Hello World!"`,
    },
    Kotlin: {
        filename: 'client.kt',
        lang: 'kotlin',
        code: `import com.example.generated.Client
import com.example.generated.models.SayHelloInput

suspend fun main() {
    val client = Client(baseUrl = "https://api.example.com")

    val response = client.sayHello(
        SayHelloInput(name = "World")
    )
    println(response.message) // "Hello World!"
}`,
    },
    cURL: {
        filename: 'terminal',
        lang: 'bash',
        code: `curl -X POST https://api.example.com/say-hello \\
  -H "Content-Type: application/json" \\
  -d '{"name": "World"}'

# Response:
# {"message":"Hello World!"}`,
    },
};

const selectedServer = ref<ServerLang>('TypeScript');
const selectedClient = ref<ClientLang>('TypeScript');

const initCopied = ref(false);
const initCommand = 'npx arri init my-arri-app';

async function copyInitCommand() {
    try {
        await navigator.clipboard.writeText(initCommand);
        initCopied.value = true;
        setTimeout(() => {
            initCopied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}
</script>

<template>
    <div>
        <!-- Hero Section -->
        <section
            class="relative overflow-hidden border-b border-background-border py-24 sm:py-32"
        >
            <div class="container relative z-10">
                <div
                    class="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between"
                >
                    <div class="max-w-3xl flex-1">
                        <div
                            class="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-background-card px-3 py-1 text-xs text-zinc-400"
                        >
                            <span
                                class="flex h-2 w-2 animate-pulse rounded-full bg-brand"
                            ></span>
                            <span>Active development towards v1.0</span>
                        </div>

                        <h1
                            class="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                        >
                            End-to-end
                            <span class="text-brand">type safety</span> without
                            DSLs.
                        </h1>

                        <p
                            class="mt-6 font-sans text-lg leading-relaxed text-zinc-400 sm:text-xl"
                        >
                            Arri is a code-first, language-agnostic RPC
                            framework. Define your API in code (TypeScript, Go,
                            or Rust) and instantly get high-performance,
                            type-safe clients for your frontend and mobile apps.
                        </p>

                        <div class="mt-10 flex flex-wrap gap-4">
                            <NuxtLink
                                to="/docs/1.getting-started/1.introduction-to-arri"
                                class="rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-brand/10 transition-all hover:scale-[1.02] hover:bg-brand-light"
                            >
                                Get Started
                            </NuxtLink>

                            <a
                                href="https://github.com/modii-dev/arri"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="rounded-lg border border-background-border bg-background-card px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-background hover:text-brand"
                            >
                                View on GitHub
                            </a>
                        </div>

                        <!-- Init Command block -->
                        <div class="mt-10">
                            <div
                                class="inline-flex items-center rounded-lg border border-background-border bg-background-card pr-2 font-mono text-xs text-zinc-300"
                            >
                                <span class="p-3 text-zinc-500">$</span>
                                <span
                                    class="py-3 pr-4 font-semibold text-zinc-200"
                                    >{{ initCommand }}</span
                                >
                                <button
                                    @click="copyInitCommand"
                                    class="rounded border border-background-border bg-background p-2 text-zinc-400 transition-colors hover:text-brand"
                                    :aria-label="
                                        initCopied ? 'Copied!' : 'Copy command'
                                    "
                                >
                                    <svg
                                        v-if="initCopied"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 text-brand"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        v-else
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex w-full flex-shrink-0 justify-center lg:w-auto lg:justify-end"
                    >
                        <HeroGraphic />
                    </div>
                </div>
            </div>
        </section>

        <!-- Dynamic Code Playground Section -->
        <section class="bg-background py-24">
            <div class="container">
                <div class="mb-12 max-w-3xl">
                    <h2
                        class="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        Code-First Development. Instant Generated Clients.
                    </h2>
                    <p class="mt-4 leading-relaxed text-zinc-400">
                        With Arri RPC, there are no intermediate interface
                        files, protobuf definitions, or separate API
                        specifications. Define your server procedures directly
                        in code, and the CLI compiles them into highly optimized
                        clients with zero build overhead.
                    </p>
                </div>

                <AnimatedPlayground />
            </div>
        </section>

        <!-- Minimal Benefits Grid -->
        <section
            class="border-b border-t border-background-border bg-background-card py-24"
        >
            <div class="container">
                <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <!-- Feature 1 -->
                    <div class="space-y-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-lg border border-background-border bg-background font-mono text-lg font-bold text-brand"
                        >
                            /
                        </div>
                        <h3 class="font-mono text-lg font-semibold text-white">
                            No DSLs Required
                        </h3>
                        <p class="text-sm leading-relaxed text-zinc-400">
                            No GraphQL, Protocol Buffers, or OpenAPI specs to
                            manually maintain. Define your schemas and endpoints
                            natively in standard server code.
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="space-y-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-lg border border-background-border bg-background font-mono text-lg font-bold text-brand"
                        >
                            *
                        </div>
                        <h3 class="font-mono text-lg font-semibold text-white">
                            High-Performance Validation
                        </h3>
                        <p class="text-sm leading-relaxed text-zinc-400">
                            Uses
                            <code class="text-brand">@arrirpc/schema</code>
                            under the hood—a validation engine compiled to raw,
                            optimized JTD serializations.
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="space-y-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-lg border border-background-border bg-background font-mono text-lg font-bold text-brand"
                        >
                            &gt;
                        </div>
                        <h3 class="font-mono text-lg font-semibold text-white">
                            Language-Agnostic
                        </h3>
                        <p class="text-sm leading-relaxed text-zinc-400">
                            First-class client generators for TypeScript, Go,
                            Rust, Dart, Kotlin, and Swift. Your clients stay
                            instantly in sync.
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="space-y-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-lg border border-background-border bg-background font-mono text-lg font-bold text-brand"
                        >
                            ~
                        </div>
                        <h3 class="font-mono text-lg font-semibold text-white">
                            Transport Agnostic
                        </h3>
                        <p class="text-sm leading-relaxed text-zinc-400">
                            Serve your APIs natively over standard
                            <code class="text-brand">HTTP</code>, persistent
                            <code class="text-brand">WebSockets</code>, or
                            high-throughput
                            <code class="text-brand">NATS</code> message
                            brokers.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Server Languages Section -->
        <section class="bg-background py-24">
            <div class="container">
                <div class="mb-16 max-w-3xl">
                    <h2
                        class="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        Use the Language You Love
                    </h2>
                    <p class="mt-4 font-sans leading-relaxed text-zinc-400">
                        Arri supports first-class server-side implementations in
                        your favorite ecosystems, preserving native idioms and
                        absolute compiler-level performance in each language.
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <!-- TypeScript Card -->
                    <div
                        class="group flex flex-col justify-between rounded-lg border border-background-border bg-background-card p-6 transition-all hover:border-brand/30"
                    >
                        <div>
                            <div
                                class="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-brand"
                            >
                                TypeScript
                            </div>
                            <h3
                                class="mb-2 font-mono text-xl font-bold text-white"
                            >
                                @arrirpc/server
                            </h3>
                            <p
                                class="mb-6 font-sans text-sm leading-relaxed text-zinc-400"
                            >
                                Fully integrated with the JS ecosystem. Features
                                rapid hot-reloads, typebox-adapter
                                compatibility, and ultra-high JTD serialization
                                speeds.
                            </p>
                        </div>
                        <NuxtLink
                            to="/docs/server-languages/typescript"
                            class="inline-flex items-center gap-1 font-mono text-xs font-bold text-zinc-300 transition-colors hover:text-brand"
                        >
                            Read TS Guide &rarr;
                        </NuxtLink>
                    </div>

                    <!-- Go Card -->
                    <div
                        class="group flex flex-col justify-between rounded-lg border border-background-border bg-background-card p-6 transition-all hover:border-brand/30"
                    >
                        <div>
                            <div
                                class="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-brand"
                            >
                                Go (Golang)
                            </div>
                            <h3
                                class="mb-2 font-mono text-xl font-bold text-white"
                            >
                                go-server
                            </h3>
                            <p
                                class="mb-6 font-sans text-sm leading-relaxed text-zinc-400"
                            >
                                Microsecond performance utilizing Go structs.
                                Auto-generates type-safe schemas at boot-time
                                with zero runtime reflection overhead.
                            </p>
                        </div>
                        <NuxtLink
                            to="/docs/server-languages/go"
                            class="inline-flex items-center gap-1 font-mono text-xs font-bold text-zinc-300 transition-colors hover:text-brand"
                        >
                            Read Go Guide &rarr;
                        </NuxtLink>
                    </div>

                    <!-- Rust Card -->
                    <div
                        class="group flex flex-col justify-between rounded-lg border border-background-border bg-background-card p-6 transition-all hover:border-brand/30"
                    >
                        <div>
                            <div
                                class="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-brand"
                            >
                                Rust
                            </div>
                            <h3
                                class="mb-2 font-mono text-xl font-bold text-white"
                            >
                                arri-server
                            </h3>
                            <p
                                class="mb-6 font-sans text-sm leading-relaxed text-zinc-400"
                            >
                                Unparalleled speed, memory safety, and
                                compilation checks. Leverage native Rust
                                proc-macros to define seamless schemas.
                            </p>
                        </div>
                        <span
                            class="inline-flex items-center gap-1 font-mono text-xs font-bold text-zinc-500"
                        >
                            Rust Guide Coming Soon
                        </span>
                    </div>

                    <!-- Bring Your Own Card -->
                    <div
                        class="group flex flex-col justify-between rounded-lg border border-dashed border-background-border bg-background/30 p-6 transition-all hover:border-brand/30"
                    >
                        <div>
                            <div
                                class="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-500"
                            >
                                Add Yours
                            </div>
                            <h3
                                class="mb-2 font-mono text-xl font-bold text-white"
                            >
                                Custom Server
                            </h3>
                            <p
                                class="mb-6 font-sans text-sm leading-relaxed text-zinc-500"
                            >
                                Want to use Python, Dart, Zig, or C++? Integrate
                                your custom framework easily using our open spec
                                definition guide.
                            </p>
                        </div>
                        <NuxtLink
                            to="/docs/server-languages/bring-your-own"
                            class="rounded border border-background-border bg-background-card px-3 py-2 text-center font-mono text-xs font-bold text-brand transition-colors hover:bg-background hover:text-brand-light"
                        >
                            Bring Your Own &rarr;
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
