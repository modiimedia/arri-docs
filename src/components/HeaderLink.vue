<script setup lang="ts">
import { NuxtLink } from '#components';

defineProps<{ to: string; isActive?: boolean }>();
</script>

<template>
    <NuxtLink
        :to="to"
        class="inline-flex px-4 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
    >
        <div class="relative">
            <div class="relative">
                <slot />
            </div>
            <div
                v-if="isActive"
                class="absolute bottom-0 left-0 right-0 z-0 h-[4px] bg-amber-500"
            />
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped></style>
