<script lang="ts" setup>
import Header from '~/components/Header.vue';
import SidebarSection from '~/components/SidebarSection.vue';
import SidebarSectionLink from '~/components/SidebarSectionLink.vue';

const route = useRoute();
const { data: page } = await useAsyncData(route.path, async () => {
    const doc = await queryCollection('docs').path(route.path).first();
    if (!doc) showError(createError({ status: 404 }));
    return doc;
});
</script>

<template>
    <div>
        <Header class="border-gray-200 dark:border-gray-700" />
        <div class="flex">
            <aside
                class="w-[275px] overflow-y-auto border-r border-gray-200 text-sm text-gray-800 dark:border-gray-800 dark:text-gray-300"
            >
                <SidebarSection :title="'Getting started'">
                    <SidebarSectionLink>Intro to Arri RPC</SidebarSectionLink>
                    <SidebarSectionLink>Installation</SidebarSectionLink>
                    <SidebarSectionLink>Core Concepts</SidebarSectionLink>
                </SidebarSection>

                <SidebarSection :title="'Server Languages'">
                    <SidebarSectionLink>Go</SidebarSectionLink>
                    <SidebarSectionLink>Typescript</SidebarSectionLink>
                    <SidebarSectionLink>Bring Your Own</SidebarSectionLink>
                </SidebarSection>
                <SidebarSection :title="'Client Languages'">
                    <SidebarSectionLink>Dart</SidebarSectionLink>
                    <SidebarSectionLink>Go</SidebarSectionLink>
                    <SidebarSectionLink>Rust</SidebarSectionLink>
                    <SidebarSectionLink>Swift</SidebarSectionLink>
                    <SidebarSectionLink>Typescript</SidebarSectionLink>
                    <SidebarSectionLink>Bring Your Own</SidebarSectionLink>
                </SidebarSection>
                <SidebarSection :title="'Specifications'">
                    <SidebarSectionLink
                        >Arri App Definition (AAD)</SidebarSectionLink
                    >
                    <SidebarSectionLink
                        >Arri Type Definition (ATD)</SidebarSectionLink
                    >
                </SidebarSection>
            </aside>
            <main class="flex-grow py-10">
                <div class="container max-w-4xl px-4">
                    <ContentRenderer v-if="page" :value="page" />
                </div>
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
