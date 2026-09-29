<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';

const route = useRoute();

// Query all pages in the docs collection
const { data: allDocs } = await useAsyncData('docs-list', () =>
    queryCollection('docs').select('title', 'path', 'stem').all(),
);

// Map directory names to friendly titles
const categoryTitles: Record<string, string> = {
    'getting-started': 'Getting Started',
    'server-languages': 'Server Languages',
    'client-languages': 'Client Languages',
    specifications: 'Specifications',
};

// Group and sort docs dynamically by parent folder
const categorizedDocs = computed(() => {
    if (!allDocs.value) return [];

    const groups: Record<
        string,
        { title: string; order: number; items: typeof allDocs.value }
    > = {};

    for (const doc of allDocs.value) {
        // stem is usually docs/category/filename or docs/filename
        // e.g., docs/1.getting-started/1.introduction-to-arri
        const parts = doc.stem.split('/');
        if (parts.length < 3) continue; // skip files directly under docs

        const rawCategory = parts[1]!; // e.g. "1.getting-started"
        const categoryClean = rawCategory.replace(/^\d+\./, ''); // e.g. "getting-started"
        const categoryOrder = parseInt(
            rawCategory.match(/^(\d+)\./)?.[1] || '99',
            10,
        );

        // item info
        const fileClean = parts[2]!; // e.g. "1.introduction-to-arri"
        const itemOrder = parseInt(
            fileClean.match(/^(\d+)\./)?.[1] || '99',
            10,
        );

        if (!groups[categoryClean]) {
            groups[categoryClean] = {
                title:
                    categoryTitles[categoryClean] ||
                    categoryClean.replace(/-/g, ' '),
                order: categoryOrder,
                items: [],
            };
        }

        // Add a temporary sort weight to items
        (doc as any)._sortWeight = itemOrder;
        groups[categoryClean].items.push(doc);
    }

    // Sort categories by their folder prefix order
    const sortedCategories = Object.values(groups).sort(
        (a, b) => a.order - b.order,
    );

    // Sort items inside categories by their file prefix order
    for (const cat of sortedCategories) {
        cat.items.sort((a: any, b: any) => a._sortWeight - b._sortWeight);
    }

    return sortedCategories;
});
</script>

<template>
    <div class="flex min-h-screen flex-col bg-background text-zinc-100">
        <AppHeader />

        <div
            class="mx-auto flex w-full max-w-7xl flex-grow px-4 sm:px-6 lg:px-8"
        >
            <!-- Sidebar (Left) -->
            <aside
                class="hidden w-64 shrink-0 border-r border-background-border py-8 pr-6 lg:block"
            >
                <nav
                    class="sticky top-[5.5rem] max-h-[calc(100vh-8rem)] space-y-8 overflow-y-auto pr-2"
                >
                    <div
                        v-for="category in categorizedDocs"
                        :key="category.title"
                        class="space-y-3"
                    >
                        <h3
                            class="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500"
                        >
                            {{ category.title }}
                        </h3>
                        <ul
                            class="ml-1 space-y-2 border-l border-background-border"
                        >
                            <li v-for="item in category.items" :key="item.path">
                                <NuxtLink
                                    :to="item.path"
                                    class="-ml-px block border-l-2 py-1 pl-4 text-sm font-medium transition-colors"
                                    :class="[
                                        route.path === item.path
                                            ? 'border-brand font-semibold text-brand'
                                            : 'border-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-200',
                                    ]"
                                >
                                    {{ item.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            <!-- Main Content Area -->
            <main class="flex-grow py-8 lg:pl-10 xl:pr-10">
                <div class="mx-auto max-w-3xl">
                    <slot />
                </div>
            </main>
        </div>

        <AppFooter />
    </div>
</template>
