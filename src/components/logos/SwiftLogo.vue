<script lang="ts" setup>
import swiftLogo from '~/assets/img/swift_logo.png';
defineProps<{ width?: number; height?: number }>();
</script>

<template>
    <img :src="swiftLogo" :width="width" :height="height" />
</template>

<style lang="scss" scoped></style>
