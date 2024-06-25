<template>
    <div class="level"> {{ number }} </div>
</template>

<script setup lang="ts">

defineProps<{
    number: number
}>()

</script>

<style>
.level {
    width: 20px;
    height: 14px;
    border-radius: 3px;
    font-size: 10px;
    text-align: center;
    background-color: #3A89F5;
    color: #ffffff;
    font-weight: 700;
    box-sizing: border-box;
    user-select: none;
}
</style>