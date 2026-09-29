<script lang="ts" setup>
import { ref, watch, nextTick, computed } from 'vue';
import { Shiki } from '#components';
import type { BundledLanguage } from 'shiki';

const props = defineProps<{
    code: string;
    lang: string;
    filename?: string;
    error?: string;
    errorProp?: string; // The exact token word to apply red squiggly underlines to
}>();

const copied = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const errorTitle = computed(() => {
    if (props.lang === 'bash' || props.filename === 'terminal') {
        return 'HTTP Error Response';
    }
    return 'Compile Error';
});

// Watch for changes in code or error to apply the squiggly red line to the mismatched key
watch(
    () => [props.code, props.errorProp],
    async () => {
        await nextTick();
        if (!containerRef.value) return;

        // Clear previous squigglies
        const previous = containerRef.value.querySelectorAll('.squiggly-error');
        previous.forEach((el) => el.classList.remove('squiggly-error'));

        // If there's an errorProp, find the Shiki span with the matching text content and underline it
        if (props.errorProp) {
            const spans = containerRef.value.querySelectorAll('span');
            for (const span of spans) {
                // Strip colons, commas, quotes, braces, and whitespace to match property keys cleanly across languages
                const cleanText = span.textContent?.trim().replace(/[:,'"{}]/g, '') || '';
                if (cleanText === props.errorProp) {
                    span.classList.add('squiggly-error');
                }
            }
        }
    },
    { immediate: true }
);

async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.code);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}
</script>

<template>
    <div ref="containerRef" class="relative group rounded-lg border border-background-border bg-background-card text-zinc-100 overflow-hidden font-mono">
        <!-- Code Block Header -->
        <div v-if="filename" class="flex items-center justify-between border-b border-background-border bg-background-card px-4 py-2.5 text-xs text-zinc-400">
            <span>{{ filename }}</span>
            <span class="uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-background border border-background-border text-zinc-500 font-semibold">{{ lang }}</span>
        </div>

        <!-- Code Block Content -->
        <div class="p-4 overflow-x-auto text-sm leading-relaxed relative">
            <Shiki
                class="shiki-dark block"
                :highlight-options="{
                    theme: 'one-dark-pro',
                    colorReplacements: {
                        '#282c34': 'transparent',
                    },
                }"
                :lang="(lang as BundledLanguage)"
                :code="code.trim()"
            />
            
            <!-- Copy button on hover -->
            <button
                @click="copyCode"
                class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border border-background-border bg-background/80 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:text-white"
                :aria-label="copied ? 'Copied code' : 'Copy code'"
            >
                <!-- Checked SVG -->
                <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-brand" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <!-- Clipboard SVG -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
            </button>
        </div>

        <!-- Integrated VS Code-style Compiler Error Panel -->
        <div
            v-if="error"
            class="border-t border-red-500/20 bg-red-950/20 px-4 py-3 text-xs text-red-400 flex items-start gap-2.5 font-mono"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div class="space-y-0.5 leading-relaxed">
                <span class="font-bold text-red-300">{{ errorTitle }}:</span>
                <p class="text-zinc-300 whitespace-pre-wrap">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.shiki) {
    background-color: transparent !important;
    margin: 0 !important;
    padding: 0 !important;
}

:deep(.squiggly-error) {
    text-decoration: underline wavy #ef4444 !important;
    text-underline-offset: 3px !important;
    font-weight: bold;
}
</style>
