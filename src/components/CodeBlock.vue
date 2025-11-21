<script lang="ts" setup>
import { Shiki } from '#components';
import type { BundledLanguage } from 'shiki';
defineProps<{
    code: string;
    lang: BundledLanguage;
    filename?: string;
}>();
</script>

<template>
    <div
        class="overflow-x-auto rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
    >
        <div
            v-if="filename"
            class="rounded-t-lg border-b border-gray-200 bg-black p-4 dark:border-gray-800"
        >
            {{ filename }}
        </div>
        <div class="p-4">
            <Shiki
                class="hidden dark:block"
                :highlight-options="{
                    theme: 'one-dark-pro',
                    colorReplacements: {
                        '#282c34': 'transparent',
                    },
                }"
                :lang="lang"
                :code="code"
            />
            <Shiki
                class="block dark:hidden"
                :highlight-options="{
                    theme: 'one-light',
                    colorReplacements: {
                        '#fafafa': 'transparent',
                    },
                }"
                :lang="lang"
                :code="code"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
