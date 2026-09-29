<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CodeBlock from '~/components/CodeBlock.vue';

const serverCodeOptions = ['TypeScript', 'Go', 'Rust'] as const;
type ServerLang = (typeof serverCodeOptions)[number];

const selectedServer = ref<ServerLang>('TypeScript');

const clientCodeOptions = [
    'TypeScript',
    'Dart',
    'Rust',
    'Swift',
    'Kotlin',
    'cURL',
] as const;
type ClientLang = (typeof clientCodeOptions)[number];

const selectedClient = ref<ClientLang>('TypeScript');

// Reactive properties being typed
const serverProp = ref('name');
const clientProp = ref('name');
const hasTypeError = ref(false);
const animStatus = ref<
    'idle' | 'typing_server' | 'error' | 'typing_client' | 'synced'
>('idle');

// Helper computed to handle capitalized forms (e.g. for Go struct Name/Username)
const serverPropCapitalized = computed(() => {
    if (!serverProp.value) return '';
    return serverProp.value.charAt(0).toUpperCase() + serverProp.value.slice(1);
});

const clientPropCapitalized = computed(() => {
    if (!clientProp.value) return '';
    return clientProp.value.charAt(0).toUpperCase() + clientProp.value.slice(1);
});

// Language-specific error messages & squiggly conditions
const clientError = computed(() => {
    if (!hasTypeError.value) return undefined;

    const prop = clientProp.value;
    const expected = serverProp.value;

    const errors: Record<ClientLang, string> = {
        TypeScript: `[TS2353] Object literal may only specify known properties, and '${prop}' does not exist in type 'SayHelloInput'. Did you mean '${expected}'?`,
        Rust: `[E0560] struct 'SayHelloInput' has no field named '${prop}'. Available fields are: '${expected}'`,
        Dart: `The named parameter '${prop}' isn't defined for the class 'SayHelloInput'. Try correcting the name to '${expected}'.`,
        Swift: `Incorrect argument label in call (have '${prop}:', expected '${expected}:')`,
        Kotlin: `Cannot find a parameter with this name: ${prop}. Expected: ${expected}`,
        cURL: `HTTP/1.1 400 Bad Request\nContent-Type: application/json\n\n{\n  "statusCode": 400,\n  "statusMessage": "Bad Request",\n  "data": "Missing required property '${expected}' on model 'SayHelloInput'."\n}`,
    };

    return errors[selectedClient.value];
});

const showSquiggly = computed(() => {
    return (
        hasTypeError.value &&
        ['TypeScript', 'Dart', 'Rust', 'Swift', 'Kotlin'].includes(
            selectedClient.value,
        )
    );
});

// Dynamic Code Generation based on Animated Properties
const serverCode = computed(() => {
    const prop = serverProp.value;
    const propCap = serverPropCapitalized.value;

    return {
        TypeScript: {
            filename: 'server.ts',
            lang: 'typescript',
            code: `import { a } from '@arrirpc/schema';
import { ArriApp, defineRpc } from '@arrirpc/server';

const app = new ArriApp();

app.rpc('sayHello', defineRpc({
    input: a.object('SayHelloInput', {
        ${prop || '_'}: a.string(),
    }),
    output: a.object('SayHelloOutput', {
        message: a.string(),
    }),
    handler({ input }) {
        return {
            message: \`Hello \${input.${prop || '_'}}!\`,
        };
    }
}));

export default app;`,
        },
        Go: {
            filename: 'main.go',
            lang: 'go',
            code: `package main

import (
    "github.com/modii-dev/arri/languages/go/go-server"
)

type SayHelloInput struct {
    ${propCap || '_'} string \`json:"${prop || '_'}"\`
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
        Message: "Hello " + input.${propCap || '_'} + "!",
    }, nil
}`,
        },
        Rust: {
            filename: 'main.rs',
            lang: 'rust',
            code: `use arri_server::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, ArriSchema)]
struct SayHelloInput {
    ${prop || '_'}: String,
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
        message: format!("Hello {}!", input.${prop || '_'}),
    })
}`,
        },
    };
});

const clientCode = computed(() => {
    const prop = clientProp.value;
    const propCap = clientPropCapitalized.value;

    return {
        TypeScript: {
            filename: 'main.ts',
            lang: 'typescript',
            code: `import { Client } from './client.g';

const client = new Client({
    baseUrl: 'https://api.example.com'
});

const response = await client.sayHello({
    ${prop || '_'}: 'john'
});
console.log(response.message); // "Hello john"`,
        },
        Dart: {
            filename: 'main.dart',
            lang: 'dart',
            code: `import 'client.g.dart';

void main() async {
  final client = Client(baseUrl: 'https://api.example.com');

  final response = await client.sayHello(
    SayHelloInput(${prop || '_'}: 'john'),
  );
  print(response.message); // "Hello john!"
}`,
        },
        Rust: {
            filename: 'main.rs',
            lang: 'rust',
            code: `use generated_client::{Client, ArriClientConfig, SayHelloInput};

#[tokio::main]
async fn main() {
    let client = Client::new(ArriClientConfig {
        base_url: "https://api.example.com".to_string(),
        ..Default::default()
    });

    let response = client.say_hello(SayHelloInput {
        ${prop || '_'}: "john".to_string(),
    }).await.unwrap();

    println!("{}", response.message); // "Hello john!"
}`,
        },
        Swift: {
            filename: 'main.swift',
            lang: 'swift',
            code: `import Foundation
import GeneratedClient

let client = Client(baseUrl: "https://api.example.com")

let response = try await client.sayHello(
    input: SayHelloInput(${prop || '_'}: "john")
)
print(response.message) // "Hello john!"`,
        },
        Kotlin: {
            filename: 'main.kt',
            lang: 'kotlin',
            code: `import com.example.generated.Client
import com.example.generated.models.SayHelloInput

suspend fun main() {
    val client = Client(baseUrl = "https://api.example.com")

    val response = client.sayHello(
        SayHelloInput(${prop || '_'} = "john")
    )
    println(response.message) // "Hello john!"
}`,
        },
        cURL: {
            filename: 'terminal',
            lang: 'bash',
            code: `curl -X POST https://api.example.com/say-hello \\
  -H "Content-Type: application/json" \\
  -d '{"${prop || '_'}": "World"}'

# Response:
# {"message":"Hello World!"}`,
        },
    };
});

// Delay utility helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let active = true;

// Step sequences for typing animations
const forwardSteps = [
    'name',
    'nam',
    'na',
    'n',
    '',
    'u',
    'us',
    'use',
    'user',
    'usern',
    'userna',
    'usernam',
    'username',
];
const backwardSteps = [
    'username',
    'usernam',
    'usernas',
    'userna',
    'usern',
    'user',
    'use',
    'us',
    'u',
    '',
    'n',
    'na',
    'nam',
    'name',
];

// Main infinite animation runner
async function runAnimationLoop() {
    while (active) {
        // --- Loop Action 1: Initial state (Both have 'name') ---
        animStatus.value = 'idle';
        serverProp.value = 'name';
        clientProp.value = 'name';
        hasTypeError.value = false;
        await delay(2500);
        if (!active) break;

        // --- Loop Action 2: Left side renames property (name -> username) ---
        animStatus.value = 'typing_server';
        for (const step of forwardSteps) {
            serverProp.value = step;
            await delay(120);
            if (!active) break;
        }
        await delay(500);
        if (!active) break;

        // --- Loop Action 3: Right side gets a red type error ---
        animStatus.value = 'error';
        hasTypeError.value = true;
        await delay(2200);
        if (!active) break;

        // --- Loop Action 4: Right side renames the property to match, error disappears ---
        animStatus.value = 'typing_client';
        for (const step of forwardSteps) {
            clientProp.value = step;
            // Error stays active until it hits 'username' exactly
            if (step === 'username') {
                hasTypeError.value = false;
            }
            await delay(120);
            if (!active) break;
        }
        await delay(500);
        if (!active) break;

        // --- Loop Action 5: Holding synced 'username' state ---
        animStatus.value = 'synced';
        await delay(2500);
        if (!active) break;

        // --- Loop Action 6: Left side names property back to original (username -> name) ---
        animStatus.value = 'typing_server';
        for (const step of backwardSteps) {
            serverProp.value = step;
            await delay(120);
            if (!active) break;
        }
        await delay(500);
        if (!active) break;

        // --- Loop Action 7: Right side gets a red type error again ---
        animStatus.value = 'error';
        hasTypeError.value = true;
        await delay(2200);
        if (!active) break;

        // --- Loop Action 8: Right side renames back to 'name', error disappears ---
        animStatus.value = 'typing_client';
        for (const step of backwardSteps) {
            clientProp.value = step;
            if (step === 'name') {
                hasTypeError.value = false;
            }
            await delay(120);
            if (!active) break;
        }
        await delay(500);
    }
}

onMounted(() => {
    active = true;
    runAnimationLoop();
});

onUnmounted(() => {
    active = false;
});
</script>

<template>
    <div class="relative grid gap-8 lg:grid-cols-2">
        <!-- Server Code Panel -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-500">
                    1. Define Server API
                </h3>
                
                <!-- Language selector -->
                <div class="flex gap-1.5 p-1 rounded-lg border border-background-border bg-background-card text-xs">
                    <button
                        v-for="opt in serverCodeOptions"
                        :key="opt"
                        @click="selectedServer = opt"
                        class="px-2.5 py-1 rounded font-mono font-semibold transition-colors font-medium"
                        :class="[
                            selectedServer === opt
                                ? 'bg-background text-brand border border-background-border shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                        ]"
                    >
                        {{ opt }}
                    </button>
                </div>
            </div>

            <CodeBlock
                :code="serverCode[selectedServer].code"
                :lang="serverCode[selectedServer].lang"
                :filename="serverCode[selectedServer].filename"
            />
        </div>

        <!-- Client Code Panel -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="font-mono text-sm font-bold uppercase tracking-wider text-zinc-500">
                    2. Generated Clients Callers
                </h3>

                <!-- Client selector -->
                <div class="flex flex-wrap gap-1 p-1 rounded-lg border border-background-border bg-background-card text-xs">
                    <button
                        v-for="opt in clientCodeOptions"
                        :key="opt"
                        @click="selectedClient = opt"
                        class="px-2 py-0.5 rounded font-mono font-semibold transition-colors font-medium"
                        :class="[
                            selectedClient === opt
                                ? 'bg-background text-brand border border-background-border shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                        ]"
                    >
                        {{ opt }}
                    </button>
                </div>
            </div>

            <CodeBlock
                :code="clientCode[selectedClient].code"
                :lang="clientCode[selectedClient].lang"
                :filename="clientCode[selectedClient].filename"
                :error="clientError"
                :error-prop="showSquiggly ? clientProp : undefined"
            />
        </div>
    </div>
</template>

<style scoped></style>
