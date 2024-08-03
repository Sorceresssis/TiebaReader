<template>
    <div class="post">
        <div class="post-avatar">
            <user-popover :user="post.user">
                <div class="avatar-wrap">
                    <el-avatar size="large"
                               shape="square"
                               :src="post.user.avatar"
                               @error="handleUserAvatarError" />
                </div>
            </user-popover>
        </div>
        <div v-viewer>
            <div class="user-info">
                <user-popover :user="post.user">
                    <div class="nickname"> {{ post.user.nickname }} </div>
                </user-popover>
                <tieba-tag v-if="post.is_thread_auhtor"
                           text="楼主" />
                <bawu v-if="post.user.is_bawu" />
                <tieba-glevel :number="post.user.glevel" />
                <tieba-level :number="post.user.level" />
            </div>
            <contents :frags="post.contents" />
            <div v-if="post.floor == 1">
                <vote-container v-if="thread.vote_info.options.length"
                                :vote-info="thread.vote_info" />
                <share-origin v-if="thread.is_share"
                              :id="thread.share_origin" />
            </div>
            <tieba-sign v-if="post.sign"
                        :text="post.sign" />
            <div class="post-tail">
                <div class="post-info">
                    <span> 第 {{ post.floor }} 楼 </span>
                    <span>{{ formatTimestampToDateTimeString(post.create_time) }}</span>
                    <span> <span class="iconfont">&#xe6cf;</span> {{ post.agree }} </span>
                    <span> <span class="iconfont">&#xe6ce;</span> {{ post.disagree }} </span>
                    <span> <span class="iconfont">&#xe602;</span> {{ post.reply_num }}</span>
                    <span v-if="post.user.ip"> IP属地:{{ post.user.ip }} </span>
                </div>
                <div v-if="post.floor !== 1 && commentsPage.total_count">
                    <div v-if="isExpandComments"
                         class="comment-list-btn"
                         @click="handleSwitchExpandComments">
                        收起回复
                    </div>
                    <div v-else
                         class="comment-list-btn"
                         @click="handleSwitchExpandComments">
                        回复({{ commentsPage.total_count }})</div>
                </div>
            </div>
            <el-collapse-transition>
                <div v-loading="isRequestingComments"
                     v-if="post.floor !== 1"
                     v-show="isExpandComments">
                    <div v-if="comments.length"
                         class="comment-list">
                        <comment v-for="comment in comments"
                                 :key="comment.id"
                                 :comment="comment" />
                    </div>
                    <el-pagination v-if="clickedViewMore"
                                   v-model:current-page="commentsPage.current_page"
                                   size="small"
                                   :page-size="commentsPage.page_size"
                                   layout="prev, pager, next, jumper, total"
                                   :total="commentsPage.total_count"
                                   @current-change="queryComments"
                                   hide-on-single-page />
                    <div v-if="!clickedViewMore && commentsPage.has_more"
                         class="view-more-comments"
                         @click="handleClickViewMore">
                        共{{ commentsPage.total_count }}条回复, 点击查看
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="post-divider"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, inject, readonly, toRaw } from 'vue'
import { formatTimestampToDateTimeString } from '@/utils/time';
import InitialValue from '@/constant/initial_value';
import ResourcePath from '@/constant/resource_path';
import { ElAvatar, ElPagination, ElMessage, ElCollapseTransition, vLoading } from 'element-plus';
import UserPopover from './UserPopover.vue';
import TiebaTag from './TiebaTag.vue';
import Bawu from '@/components/Bawu.vue';
import TiebaGlevel from '@/components/TiebaGlevel.vue'
import TiebaLevel from '@/components/TiebaLevel.vue'
import Contents from '@/components/Contents.vue';
import VoteContainer from '@/components/VoteContainer.vue';
import ShareOrigin from '@/components/ShareOrigin.vue';
import TiebaSign from '@/components/TiebaSign.vue';
import Comment from '@/components/Comment.vue';

const isRequestingComments = ref<boolean>(false)
const threadSource = readonly(inject<RP.ThreadSource>('threadSource')!)
const thread = inject<VO.Thread>('thread')!
const commentRn = 5

const props = defineProps<{
    post: VO.Post
}>()

const clickedViewMore = ref<boolean>(false)
const isExpandComments = ref<boolean>(true)

const comments = ref<VO.Comment[]>([])
const commentsPage = reactive<Page>(InitialValue.getPage())

const queryComments = function () {
    isRequestingComments.value = true
    window.dataAPI.getComments(toRaw(threadSource), {
        pid: props.post.id,
        pn: commentsPage.current_page,
        rn: commentRn,
        sort: 0
    }).then((res) => {
        if (res.code !== 0) {
            ElMessage.error(`获取评论失败: ${res.msg}`)
            return
        }
        comments.value = res.data.comments
        Object.assign(commentsPage, res.data.page)
    }).finally(() => {
        isRequestingComments.value = false
    })
}

const handleUserAvatarError = function () {
    props.post.user.avatar = ResourcePath.USER_AVATAR_DEFAULT
}

const handleSwitchExpandComments = function () {
    isExpandComments.value = !isExpandComments.value
}

const handleClickViewMore = function () {
    clickedViewMore.value = true
    queryComments()
}

onMounted(() => {
    comments.value = props.post.comments.comments
    Object.assign(commentsPage, props.post.comments.page)
})

</script>

<style>
.post {
    --post-avatar-width: 100px;
    width: 80%;
    min-width: 700px;
    padding: 22px 15px 0 var(--post-avatar-width);
    position: relative;
    box-sizing: border-box;
    user-select: text;
}

.post-avatar {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    width: var(--post-avatar-width);
    cursor: pointer;
}

.avatar-wrap {
    padding: 1px;
    border: 1px solid #e1e1e1;
}

.post .user-info {
    display: flex;
    align-items: center;
    height: 28px;
    font-size: 13px;
    gap: 0 6px;
}

.post:not(:last-child) .post-divider {
    height: 22px;
    border-bottom: 1px solid #d6dee5;
}

.post-tail {
    display: flex;
    position: relative;
    justify-content: space-between;
    font-size: 13px;
}

.post-info {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 13px;
    color: #9499A0;
    font-weight: 400;
    box-sizing: border-box;
}

.post-info>span {
    margin-right: 15px;
}

.comment-list-btn {
    height: 27px;
    position: absolute;
    right: 0;
    padding: 0 10px;
    cursor: pointer;
    color: #1D53BF;
    user-select: none;
}

.comment-list {
    margin-top: 10px;
    background-color: #F7F8FA;
}

.view-more-comments {
    margin-top: 6px;
    font-size: 13px;
    color: #9499A0;
    cursor: pointer;
}

.view-more-comments:hover {
    color: #008AC5;
}
</style>