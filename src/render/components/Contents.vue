<template>
    <div class="contents">
        <span v-if="replyToUser">
            <span>{{ '回复 ' }}</span>
            <user-popover :user="replyToUser">
                <span class="nickname"> {{ replyToUser.nickname }} </span>
            </user-popover>
            <span>{{ ' : ' }}</span>
        </span>
        <content-frag v-for="frag in frags"
                      :frag="frag" />
    </div>
</template>

<script setup lang="ts">
import ContentFrag from '@/components/content_frag/ContentFrag.vue'
import UserPopover from './UserPopover.vue';

defineProps<{
    frags: VO.ContentFragment[]
    replyToUser?: VO.User
}>();

</script>

<style>
.contents {
    padding: 10px 0;
    font-size: 14px;
    min-height: 1em;
    width: 100%;
    color: #18191C;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
    /* 1.保留所有空白字符和换行符。2.自动换行（即当一行文本太长而超出容器宽度时，会自动换行）。 */
    white-space: pre-wrap;
    /* white-space: pre-line; 1.合并多余的空白字符（即连续的空白字符会被压缩为一个空格）。2.保留换行符。3.自动换行（即当一行文本太长而超出容器宽度时，会自动换行）。*/
    line-height: 24px;
    box-sizing: border-box;
}
</style>