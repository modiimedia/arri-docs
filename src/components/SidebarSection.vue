<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<template>
    <div class="py-6 pl-4">
        <div class="pb-4 text-xs uppercase">{{ title }}</div>
        <slot />
    </div>
</template>

<style lang="scss" scoped></style>
