<template>
    <img v-if="isIncludedEmoji"
         class="emoji"
         width="20px"
         height="20px"
         :src="generateEmojiUrl(frag)"
         :title="frag.desc"
         @error="handleError">
    <span v-else
          :title="frag.desc">{{ emojiErrorText }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    frag: VO.FragEmoji
}>()

const isIncludedEmoji = ref<boolean>(true)
const emojiErrorText = ref<string>('')

const generateEmojiUrl = function (frag: VO.FragEmoji) {
    return `../emojis/${frag.type}/${frag.id}.png`
}

const generateEmojiErrorText = function (frag: VO.FragEmoji) {
    return ` EMOJI(${frag.desc},${frag.type},${frag.id}); `
}

const handleError = function () {
    isIncludedEmoji.value = false
    emojiErrorText.value = generateEmojiErrorText(props.frag)
}

</script>

<style>
.emoji {
    display: inline-block;
    padding: 0 2px;
}
</style>