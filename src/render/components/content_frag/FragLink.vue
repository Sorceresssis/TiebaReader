<template>
    <a class="link"
       @click.prevent="openInBrowser(frag.raw_url)">
        {{ frag.title }}
    </a>
</template>

<script setup lang="ts">
import { openInBrowser } from '@/api/electronApi';

defineProps<{
    frag: VO.FragLink
}>()

</script>

<style></style>