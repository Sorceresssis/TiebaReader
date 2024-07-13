<template>
    <frag-text v-if="FragType.TEXT === frag.type"
               :frag="frag as VO.FragText" />
    <frag-emoji v-else-if="FragType.EMOJI === frag.type"
                :frag="frag as VO.FragEmoji" />
    <frag-image v-else-if="FragType.IMAGE === frag.type"
                :frag="frag as VO.FragImage" />
    <frag-at v-else-if="FragType.AT === frag.type"
             :frag="frag as VO.FragAt" />
    <frag-link v-else-if="FragType.LINK === frag.type"
               :frag="frag as VO.FragLink" />
    <frag-tieba-plus v-else-if="FragType.TIEBA_PLUS === frag.type"
                     :frag="frag as VO.FragTiebaPlus" />
    <frag-video v-else-if="FragType.VIDEO === frag.type"
                :frag="frag as VO.FragVideo" />
    <frag-voice v-else-if="FragType.VOICE === frag.type"
                :frag="frag as VO.FragVoice" />
    <frag-scrape-error v-else-if="FragType.SCRAPE_ERROR === frag.type"
                       :frag="frag as VO.FragScrapeError" />
    <span v-else
          :frag="frag"></span>
</template>

<script setup lang="ts">
import { FragType } from '@/constant/enum';
import FragScrapeError from '@/components/content_frag/FragScrapeError.vue';
import FragText from '@/components/content_frag/FragText.vue';
import FragEmoji from '@/components/content_frag/FragEmoji.vue';
import FragImage from '@/components/content_frag/FragImage.vue';
import FragAt from '@/components/content_frag/FragAt.vue';
import FragLink from '@/components/content_frag//FragLink.vue';
import FragTiebaPlus from '@/components/content_frag/FragTiebaPlus.vue'
import FragVideo from '@/components/content_frag/FragVideo.vue';
import FragVoice from '@/components/content_frag/FragVoice.vue';

defineProps<{
    frag: VO.ContentFragment
}>();
</script>

<style scoped></style>