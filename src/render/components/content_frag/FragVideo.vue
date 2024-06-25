<template>
    <div class="frag-video-wrap">
        <video ref="video"
               class="frag-video"
               controls
               :src="frag.src"
               :poster="frag.cover_src" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MediaPlayServices from '@/services/MediaPlayServices';
const video = ref<HTMLVideoElement | undefined>()

defineProps<{
    frag: VO.FragVideo
}>()

onMounted(() => {
    video.value?.addEventListener('play', function () {
        MediaPlayServices.playVideo(this)
    })
})
</script>

<style>
.frag-video-wrap {
    box-sizing: border-box;
}

.frag-video {
    max-width: 100%;
    object-fit: contain;
    object-position: center;
}
</style>