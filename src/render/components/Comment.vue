<template>
    <div class="comment">
        <div class="comment-avatar">
            <user-popover :user="comment.user">
                <div class="avatar-wrap">
                    <el-avatar :size="'default'"
                               shape="square"
                               :src="comment.user.avatar"
                               @error="handleUserAvatarError" />
                </div>
            </user-popover>
        </div>
        <div v-viewer>
            <div class="user-info">
                <user-popover :user="comment.user">
                    <div class="nickname"> {{ comment.user.nickname }} </div>
                </user-popover>
                <tieba-tag v-if="comment.is_thread_auhtor"
                           text="楼主" />
                <bawu v-if="comment.user.is_bawu" />
                <tieba-glevel :number="comment.user.glevel" />
                <tieba-level :number="comment.user.level" />
            </div>
            <contents :frags="comment.contents"
                      :reply-to-user="comment.reply_to_user" />
            <div class="post-info">
                <span>{{ formatTimestampToDateTimeString(comment.create_time) }}</span>
                <span> <span class="iconfont">&#xe6cf;</span> {{ comment.agree }} </span>
                <span> <span class="iconfont">&#xe6ce;</span> {{ comment.disagree }} </span>
                <span v-if="comment.user.ip"> IP属地:{{ comment.user.ip }} </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElAvatar } from 'element-plus';
import { formatTimestampToDateTimeString } from '@/utils/time';
import ResourcePath from '@/constant/resource_path';
import UserPopover from './UserPopover.vue';
import TiebaTag from './TiebaTag.vue';
import Bawu from '@/components/Bawu.vue';
import TiebaGlevel from '@/components/TiebaGlevel.vue'
import TiebaLevel from '@/components/TiebaLevel.vue'
import Contents from '@/components/Contents.vue';

const props = defineProps<{
    comment: VO.Comment
}>()


const handleUserAvatarError = function () {
    props.comment.user.avatar = ResourcePath.USER_AVATAR_DEFAULT
}

</script>

<style>
.comment {
    --comment-avatar-width: 70px;
    width: 100%;
    padding: 20px 15px 0 var(--comment-avatar-width);
    position: relative;
    box-sizing: border-box;
}

.comment:last-child {

    padding-bottom: 10px;
}

.comment-avatar {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    width: var(--comment-avatar-width);
    cursor: pointer;
}
</style>