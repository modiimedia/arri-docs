<script lang="ts" setup>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>

<template>
    <div class="flex min-h-screen flex-col bg-background text-zinc-100 selection:bg-brand/30 selection:text-white">
        <AppHeader />
        <main class="flex-grow">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>
