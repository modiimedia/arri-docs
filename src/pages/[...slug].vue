<script lang="ts" setup>
import { useRoute, createError, showError } from '#imports';

definePageMeta({
    layout: 'docs',
});

const route = useRoute();

const { data: page } = await useAsyncData(`page-${route.path}`, async () => {
    const doc = await queryCollection('docs').path(route.path).first();
    if (!doc) throw createError({ statusCode: 404, statusMessage: 'Page not found' });
    return doc;
});

useSeoMeta({
    title: () => page.value?.title ? `${page.value.title} - Arri RPC` : 'Arri RPC Documentation',
    description: () => page.value?.description || 'Arri RPC framework documentation.',
});
</script>

<template>
    <div v-if="page" class="py-4">
        <!-- Breadcrumbs / Top Meta -->
        <div class="mb-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>Docs</span>
            <span>/</span>
            <span class="text-zinc-400 capitalize">{{ route.path.split('/')[2]?.replace(/-/g, ' ') }}</span>
            <span>/</span>
            <span class="text-brand font-medium">{{ page.title }}</span>
        </div>

        <!-- Main Heading -->
        <h1 class="mb-4 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {{ page.title }}
        </h1>
        <p v-if="page.description" class="mb-8 text-lg text-zinc-400 leading-relaxed font-sans">
            {{ page.description }}
        </p>

        <!-- Divider -->
        <hr class="mb-8 border-background-border" />

        <!-- Markdown Content -->
        <article class="prose prose-zinc prose-invert max-w-none prose-headings:font-mono prose-headings:font-bold prose-headings:tracking-tight prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-pre:bg-background-card prose-pre:border prose-pre:border-background-border prose-pre:p-4 prose-code:font-mono prose-code:text-brand-light prose-code:bg-background-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none">
            <ContentRenderer :value="page" />
        </article>
    </div>
</template>
