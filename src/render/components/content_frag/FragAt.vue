<template>
    <user-popover :user="user">
        <span class="nickname"> {{ frag.text }} </span>
    </user-popover>
</template>

<script setup lang="ts">
import { onMounted, reactive, readonly, inject, toRaw } from 'vue';
import UserPopover from '../UserPopover.vue';
import InitialValue from '@/constant/initial_value';

const props = defineProps<{
    frag: VO.FragAt
}>()

const threadSource = readonly(inject<RP.ThreadSource>('threadSource')!)

const user = reactive<VO.User>(InitialValue.getUser())

onMounted(() => {
    window.dataAPI.getUserInfo(toRaw(threadSource), props.frag.user_id).then(res => {
        if (res.code !== 0) {
            return
        }
        Object.assign(user, res.data)
    })
})

</script>

<style></style>