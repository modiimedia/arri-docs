<script lang="ts" setup>
import { useRoute, createError, showError } from '#imports';

definePageMeta({
    layout: 'docs',
});

const route = useRoute();

const { data: page } = await useAsyncData(`page-${route.path}`, async () => {
    const doc = await queryCollection('docs').path(route.path).first();
    if (!doc) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found' });
    }
    return doc;
});

useSeoMeta({
    title: () =>
        page.value?.title
            ? `${page.value.title} - Arri RPC`
            : 'Arri RPC Documentation',
    description: () =>
        page.value?.description || 'Arri RPC framework documentation.',
});
</script>

<template>
    <div v-if="page" class="py-4">
        <!-- Breadcrumbs / Top Meta -->
        <div
            class="mb-4 flex items-center gap-2 font-mono text-xs text-zinc-500"
        >
            <span>Docs</span>
            <span>/</span>
            <span class="capitalize text-zinc-400">{{
                route.path.split('/')[2]?.replace(/-/g, ' ')
            }}</span>
            <span>/</span>
            <span class="font-medium text-brand">{{ page.title }}</span>
        </div>

        <!-- Main Heading -->
        <h1
            class="mb-4 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
            {{ page.title }}
        </h1>
        <p
            v-if="page.description"
            class="mb-8 font-sans text-lg leading-relaxed text-zinc-400"
        >
            {{ page.description }}
        </p>

        <!-- Divider -->
        <hr class="mb-8 border-background-border" />

        <!-- Markdown Content -->
        <article
            class="prose prose-zinc prose-invert max-w-none prose-headings:font-mono prose-headings:font-bold prose-headings:tracking-tight prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-background-card prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-xs prose-code:text-brand-light prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-background-border prose-pre:bg-background-card prose-pre:p-4"
        >
            <ContentRenderer :value="page" />
        </article>
    </div>
</template>
