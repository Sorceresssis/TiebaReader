<template>
    <div class="share-origin">
        <div class="share-origin_title_wrap">
            <span>原帖: </span><span class="share-origin_title"
                  @click="openShareOriginThread">{{ shareOriginThread.title }}</span>
        </div>
        <user-popover :user="user">
            <span class="share-origin-user nickname"> @{{ user.nickname }} </span>
        </user-popover>
        <contents :frags="contents" />
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, reactive, readonly } from 'vue';
import Contents from './Contents.vue';
import InitialValue from '@/constant/initial_value';
import { ElMessage } from 'element-plus';
import UserPopover from './UserPopover.vue';

const props = defineProps<{
    id: number
}>()

const threadSource = readonly(inject<RP.ThreadSource>('threadSource')!)

const openShareOriginThread = function () {
    window.appAPI.createThreadWindow(threadSource.path, props.id)
}

const shareOriginThread = reactive<VO.Thread>(InitialValue.getThread())
const user = reactive<VO.User>(InitialValue.getUser())
const contents = ref<VO.ContentFragment[]>([])

onMounted(() => {
    window.dataAPI.getThreadPreview({
        path: threadSource.path,
        tid: props.id
    }).then((res) => {
        if (res.code !== 0) {
            ElMessage.error(res.msg)
            return
        }
        contents.value = res.data.contents
        if (res.data.user) Object.assign(user, res.data.user)
        Object.assign(shareOriginThread, res.data.thread)
    })
})

</script>

<style>
.share-origin {
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    background-color: #F1F1F3;
    box-sizing: border-box;
}

.share-origin_title_wrap {
    margin-bottom: 6px;
}

.share-origin_title {
    cursor: pointer;
}

.share-origin_title:hover {
    text-decoration: underline;
}

.share-origin-user {
    font-size: 14px;
    line-height: 24px;
}
</style>