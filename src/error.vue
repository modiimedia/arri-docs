<script lang="ts" setup>
import type { NuxtError } from '#app';
import Header from '~/components/Header.vue';

const _props = defineProps({
    error: Object as () => NuxtError,
});

const _handleError = () => clearError({ redirect: '/' });
</script>

<template>
    <div>
        <Header />
        <section class="py-20">
            <div class="container px-4">
                <h1 class="text-6xl">Error {{ error?.statusCode }}</h1>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped></style>
