<script setup lang="ts">
import { NuxtLink } from '#components';

defineProps<{ to: string; isActive?: boolean }>();
</script>

<template>
    <NuxtLink
        :to="to"
        class="px-4 inline-flex dark:hover:text-gray-300 dark:text-white hover:text-gray-700 text-black"
    >
        <div class="relative">
            <div class="relative">
                <slot />
            </div>
            <div
                v-if="isActive"
                class="absolute z-0 bottom-0 left-0 right-0 h-[4px] bg-yellow-500"
            />
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped></style>
