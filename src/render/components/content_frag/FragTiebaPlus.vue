<template>
    <a class="link"
       @click.prevent="openInBrowser(frag.url)">
        {{ frag.text }}
    </a>
</template>

<script setup lang="ts">
import { openInBrowser } from '@/api/electronApi';

defineProps<{
    frag: VO.FragTiebaPlus
}>()
</script>

<style></style>