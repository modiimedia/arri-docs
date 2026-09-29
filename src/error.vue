<script lang="ts" setup>
import type { NuxtError } from '#app';
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';

const props = withDefaults(defineProps<{ error?: NuxtError }>(), {
    error: () => createError({ status: 200 }),
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
    <div class="flex min-h-screen flex-col bg-background text-zinc-100">
        <AppHeader />

        <main class="flex flex-grow items-center justify-center">
            <div class="container max-w-xl py-20 text-center">
                <div
                    class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-lg border border-background-border bg-background-card font-mono text-3xl font-bold text-brand"
                >
                    !
                </div>

                <h1
                    class="mb-4 font-mono text-4xl font-bold tracking-tight text-white"
                >
                    Error {{ error?.statusCode || 500 }}
                </h1>

                <p class="mb-8 font-sans text-zinc-400">
                    {{ error?.message || 'An unexpected error occurred.' }}
                </p>

                <button
                    @click="handleError"
                    class="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-brand/10 transition-all hover:bg-brand-light"
                >
                    Back to Safety
                </button>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
