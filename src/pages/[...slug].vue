<script lang="ts" setup>
import Header from '~/components/Header.vue';

const route = useRoute();
const { data: page } = await useAsyncData(route.path, async () => {
    const doc = await queryCollection('docs').path(route.path).first();
    if (!doc) showError(createError({ status: 404 }));
    return doc;
});
</script>

<template>
    <div>
        <Header />
        <section class="py-20">
            <div class="container px-4">
                {{ page?.title }}
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped></style>
