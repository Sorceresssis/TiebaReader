<template>
    <div class="glevel"> Lv.{{ number }} </div>
</template>

<script setup lang="ts">

defineProps<{
    number: number
}>()

</script>

<style>
.glevel {
    width: 30px;
    height: 14px;
    border-radius: 3px;
    font-size: 10px;
    text-align: center;
    background-color: #FBD279;
    color: #593617;
    font-weight: 700;
    box-sizing: border-box;
    user-select: none;
}
</style>