<template>
    <div class="tieba-tag"> {{ text }} </div>
</template>

<script setup lang="ts">

defineProps<{
    text: string
}>();

</script>

<style>
.tieba-tag {
    --tieba-tag-color: #7559FF;
    min-width: 30px;
    height: 14px;
    padding: 0 5px;
    border-radius: 3px;
    border: 1px solid var(--tieba-tag-color);
    color: var(--tieba-tag-color);
    font-size: 10px;
    text-align: center;
    box-sizing: border-box;
    user-select: none;
}
</style>