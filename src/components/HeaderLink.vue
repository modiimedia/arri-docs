<script setup lang="ts">
import { NuxtLink } from '#components';

const props = defineProps<{ to: string; isActive?: boolean }>();
</script>

<template>
    <NuxtLink :to="to" class="px-4 inline-flex">
        <div class="relative">
            <div class="relative">
                <slot></slot>
            </div>
            <div
                v-if="isActive"
                class="absolute z-0 bottom-0 left-0 right-0 h-[4px] bg-yellow-500"
            ></div>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped></style>
