<script lang="ts" setup>
import HeaderLink from './HeaderLink.vue';

const route = useRoute();
</script>

<template>
    <div>
        <div class="container py-4 px-4 flex justify-between">
            <NuxtLink to="/" class="inline-flex text-3xl">
                Arri
                <span class="text-yellow-500 font-bold">[</span>
                RPC
                <span class="text-yellow-300 bold-bold">]</span>
            </NuxtLink>
            <div class="flex">
                <HeaderLink to="/" :is-active="route.path === '/'">
                    home
                </HeaderLink>
                <HeaderLink
                    to="/docs"
                    :is-active="route.path.startsWith('/docs')"
                >
                    docs
                </HeaderLink>
                <HeaderLink
                    to="/about"
                    :is-active="route.path.startsWith('/about')"
                >
                    about
                </HeaderLink>
                <HeaderLink
                    to="/support"
                    :is-active="route.path.startsWith('/support')"
                >
                    support
                </HeaderLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
