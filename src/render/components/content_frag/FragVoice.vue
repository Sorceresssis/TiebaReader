<template>
    <div class="voice"
         @click="handleVoiceSwitch">
        <div class="bg"
             :class="[isPlaying ? 'voicePlay' : '']"></div>

        <span v-if="isPlaying"
              class="duration">{{ remainingTime }}</span>
        <span v-else
              class="duration">{{ frag.duration }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MediaPlayServices from '@/services/MediaPlayServices';

const props = defineProps<{
    frag: VO.FragVoice
}>()

const isPlaying = ref<boolean>(false)
const remainingTime = ref<number>(0)

const { playCallback, pauseCallback, endCallback } = (function () {
    let intervalId: any

    const playCallback = () => {
        remainingTime.value = props.frag.duration
        isPlaying.value = true
        intervalId = setInterval(() => {
            remainingTime.value -= 1
        }, 1000)
    }

    const pauseCallback = () => {
        clearInterval(intervalId)
        isPlaying.value = false
    }
    const endCallback = pauseCallback

    return {
        playCallback,
        pauseCallback,
        endCallback
    }
})()

const handleVoiceSwitch = function () {
    if (isPlaying.value) {
        MediaPlayServices.pauseAmr()
    } else {
        MediaPlayServices.playAmr(props.frag.src, playCallback, pauseCallback, endCallback)
    }
}

</script>

<style></style>