<template>
    <div class="frag-scrape-error">
        <h2 class="title">Error Fragment</h2>
        <p class="message">This fragment encountered an error during scraping.</p>
        <p class="details">FragType: {{ frag.error_frag_type }}; FragName: {{ frag.error_frag_name }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
    frag: VO.FragScrapeError
}>()
</script>

<style>
.frag-scrape-error {
    --frag-scrape-error-color: #b30000;
    --frag-scrape-error-bg-color: #ffe6e6;
    --frag-scrape-error-border-color: #ff0000;
    padding: 10px;
    border: 1px solid var(--frag-scrape-error-border-color);
    background-color: var(--frag-scrape-error-bg-color);
    color: var(--frag-scrape-error-color);
    margin: 10px 0;
}

.frag-scrape-error .title {
    font-size: 1em;
    font-weight: bold;
    border-bottom: 1px solid var(--frag-scrape-error-color);
    padding-bottom: 5px;
}

.frag-scrape-error .message {
    margin: 10px 0;
    font-size: 14px;
}

.frag-scrape-error .details {
    margin: 5px 0;
    padding: 5px 0;
    background-color: var(--frag-scrape-error-bg-color);
    padding: 10px;
    border: 1px solid var(--frag-scrape-error-border-color);
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
}
</style>