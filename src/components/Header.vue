<script lang="ts" setup>
import HeaderLink from './HeaderLink.vue';

const route = useRoute();
</script>

<template>
    <div>
        <div class="flex justify-between px-4 py-4">
            <NuxtLink to="/" class="inline-flex text-3xl">
                Arri
                <span class="font-bold text-yellow-500">[</span>
                RPC
                <span class="font-bold text-yellow-500">]</span>
            </NuxtLink>

            <div class="flex items-center">
                <button
                    class="mr-4 rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800"
                >
                    Ctrl K
                </button>
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
                <!-- <HeaderLink
                    to="/support"
                    :is-active="route.path.startsWith('/support')"
                >
                    support
                </HeaderLink> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
