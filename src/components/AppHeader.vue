<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Docs', path: '/docs/1.getting-started/1.introduction-to-arri' },
];
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-background-border bg-background/85 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <!-- Logo -->
            <NuxtLink to="/" class="group flex items-center gap-1 font-mono text-xl tracking-tight text-white">
                <span class="font-bold text-zinc-400 group-hover:text-brand transition-colors">Arri</span>
                <span class="font-bold text-brand">[</span>
                <span class="text-zinc-100 font-semibold group-hover:text-white transition-colors">RPC</span>
                <span class="font-bold text-brand">]</span>
            </NuxtLink>

            <!-- Navigation Links -->
            <nav class="flex items-center gap-6">
                <NuxtLink
                    v-for="link in navLinks"
                    :key="link.path"
                    :to="link.path"
                    class="relative py-1 text-sm font-medium transition-colors hover:text-white"
                    :class="[
                        route.path === link.path || (link.path !== '/' && route.path.startsWith(link.path.split('/').slice(0, 3).join('/')))
                            ? 'text-brand'
                            : 'text-zinc-400'
                    ]"
                >
                    {{ link.label }}
                    <span
                        v-if="route.path === link.path || (link.path !== '/' && route.path.startsWith(link.path.split('/').slice(0, 3).join('/')))"
                        class="absolute bottom-0 left-0 h-0.5 w-full bg-brand rounded-full"
                    />
                </NuxtLink>
            </nav>

            <!-- Action Buttons / GitHub -->
            <div class="flex items-center gap-4">
                <a
                    href="https://github.com/modii-dev/arri"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-zinc-400 hover:text-white transition-colors"
                    aria-label="GitHub Repository"
                >
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </header>
</template>
