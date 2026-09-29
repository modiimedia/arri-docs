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
        
        <main class="flex-grow flex items-center justify-center">
            <div class="container text-center max-w-xl py-20">
                <div class="inline-flex h-16 w-16 items-center justify-center rounded-lg border border-background-border bg-background-card font-mono text-3xl font-bold text-brand mb-6">
                    !
                </div>
                
                <h1 class="font-mono text-4xl font-bold tracking-tight text-white mb-4">
                    Error {{ error?.statusCode || 500 }}
                </h1>
                
                <p class="text-zinc-400 font-sans mb-8">
                    {{ error?.message || "An unexpected error occurred." }}
                </p>
                
                <button
                    @click="handleError"
                    class="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-brand-light shadow-lg shadow-brand/10"
                >
                    Back to Safety
                </button>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
