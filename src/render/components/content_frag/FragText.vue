<template>
    <span>{{ frag.text }}</span>
</template>

<script setup lang="ts">

defineProps<{
    frag: VO.FragText
}>()

</script>

<style></style>