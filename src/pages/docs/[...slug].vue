<script lang="ts" setup>
const route = useRoute();
console.log(route.path);
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('docs').first();
});
</script>

<template>
    <div>{{ JSON.stringify(page) }}</div>
</template>

<style lang="scss" scoped></style>
