<template>
    <div>
        <img class="content-frag-image"
             :src="frag.src"
             :width="frag.show_width"
             :height="frag.show_height">
    </div>
</template>

<script setup lang="ts">

defineProps<{
    frag: VO.FragImage
}>()

</script>

<style scoped></style>