<template>
    <div v-loading="isReceivingThreadSource"
         id="page">
        <transition name="collapse">
            <sidebar v-if="showSidebar" />
        </transition>
        <el-overlay v-if="showSidebar && !showSidebarWindowAdap"
                    @click="handleSwitchSidebarExpand"
                    :z-index="49"></el-overlay>
        <div class="collapse-thumb-track">
            <span @click="handleSwitchSidebarExpand"
                  class="collapse-thumb iconfont"> &#xe653; </span>
        </div>
        <div v-loading="isRequestingPosts"
             class="left-container">
            <div class="thread">
                <div class="thread-title">
                    <h1 :title="thread.title"> {{ thread.title }} </h1>
                </div>
                <div class="thread-tail">
                    <div class="thread-meta">
                        <span>{{ formatTimestampToDateTimeString(thread.create_time) }}</span>
                        <span> <span class="iconfont">&#xe69e;</span> {{ thread.view_num }}</span>
                        <span> <span class="iconfont">&#xe602;</span> {{ thread.reply_num }}</span>
                        <span> <span class="iconfont">&#xe622;</span> {{ thread.share_num }}</span>
                        <div class="thread-tag">
                            <tieba-tag v-if="thread.is_help"
                                       text="求助帖" />
                            <tieba-tag v-if="thread.is_share"
                                       text="分享帖" />
                        </div>
                    </div>
                    <div class="thread-toolbar">
                        <el-select v-model="sortby"
                                   placeholder="Select"
                                   size="small"
                                   style="width: 90px"
                                   @change="queryPosts">
                            <el-option v-for="item in sortOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value" />
                        </el-select>
                        <el-select v-model="filterby"
                                   placeholder="Select"
                                   size="small"
                                   style="width: 90px"
                                   @change="queryPosts">
                            <el-option v-for="item in filterOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="posts-wrap scrollbar-y-w8"
                 ref="scrollBarRef">
                <div class="post-list">
                    <post v-for="post in posts"
                          :key="post.id"
                          :post="post" />
                </div>
                <el-backtop :target="'.posts-wrap'"
                            :visibility-height="100"
                            :right="100"
                            :bottom="100"
                            class="backtop-btn">
                </el-backtop>
            </div>
            <div class="footer">
                <el-pagination v-model:current-page="page.current_page"
                               class="post-list-pagination"
                               background
                               size="small"
                               :page-size="page.page_size"
                               layout="prev, pager, next, jumper, total"
                               :total="page.total_count"
                               @current-change="queryPosts" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, reactive, onUnmounted, computed } from 'vue';
import { formatTimestampToDateTimeString } from '@/utils/time';
import { vLoading, ElBacktop, ElPagination, ElMessage, ElOverlay } from 'element-plus'
import InitialValue from '@/constant/initial_value';
import Sidebar from './views/Sidebar.vue';
import Post from '@/components/Post.vue';
import TiebaTag from '../components/TiebaTag.vue';

const isReceivingThreadSource = ref<boolean>(true)
const isRequestingPosts = ref<boolean>(true)

const userCloseSidebar = ref<boolean>(false)
const userOpenSidebar = ref<boolean>(false)
const showSidebarWindowAdap = ref<boolean>(true)
const showSidebar = computed(() => {
    if (showSidebarWindowAdap.value) {
        userOpenSidebar.value = false
        return userCloseSidebar.value ? false : true
    } else {
        return userOpenSidebar.value ? true : false
    }
})

const sortby = ref<number>(0)
const sortOptions = [
    { value: 0, label: '正序' },
    { value: 1, label: '倒序' },
    { value: 2, label: '点赞' },
    { value: 3, label: '回复' },
]
const filterby = ref<number>(0)
const filterOptions = [
    { value: 0, label: '全部' },
    { value: 1, label: '只看楼主' },
    { value: 2, label: '楼主帖和楼主回复帖' },
]
const scrollBarRef = ref<HTMLElement>()
const setScrollPosition = function (position: number) {
    scrollBarRef.value!.scrollTop = position
}

const threadSource: RP.ThreadSource = { path: '', tid: 0 }
provide('threadSource', threadSource);

const scrapeInfo = reactive<VO.ScrapeInfo>(InitialValue.getScrapeInfo())
const forum = reactive<VO.Forum>(InitialValue.getForum())
const thread = reactive<VO.Thread>(InitialValue.getThread())
provide('scrapeInfo', scrapeInfo)
provide('forum', forum)
provide('thread', thread)

const posts = ref<VO.Post[]>([]);
const page = reactive<Page>(InitialValue.getPage())


const queryPosts = () => {
    isRequestingPosts.value = true
    window.dataAPI.getPosts(threadSource, {
        pn: page.current_page,
        rn: page.page_size,
        sort: sortby.value,
        filter: filterby.value,
        comment_rn: 3,
        comment_sort: 1
    }).then((res) => {
        if (res.code !== 0) {
            ElMessage.error(`获取帖子失败: ${res.msg}`)
            return
        }
        posts.value = res.data.posts
        setScrollPosition(0)
        Object.assign(page, res.data.page)
    }).finally(() => {
        isRequestingPosts.value = false
    })
}

const handleSwitchSidebarExpand = function () {
    if (showSidebar.value) {
        userOpenSidebar.value = false
        userCloseSidebar.value = true
    } else {
        userOpenSidebar.value = true
        userCloseSidebar.value = false
    }
}


const handleResize = function () {
    if (window.innerWidth < 1000) {
        showSidebarWindowAdap.value = false;
    } else {
        showSidebarWindowAdap.value = true;
    }
}

onMounted(() => {
    window.appAPI.acceptThreadWindowParams((e, source) => {
        threadSource.path = source.path;
        threadSource.tid = source.tid;
        isReceivingThreadSource.value = false;

        window.dataAPI.getThreadInfo(threadSource).then((res) => {
            Object.assign(thread, res.data.thread)
            Object.assign(forum, res.data.forum)
            Object.assign(scrapeInfo, res.data.scrape_info)

            document.title = `${thread.title} - ${forum.name}吧`
        })

        queryPosts()
    })

    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

</script>

<style>
.collapse-thumb-track {
    width: var(--collapse-thumb-track-width);
    display: flex;
    align-items: center;
}

.collapse-thumb {
    height: 25px;
    line-height: 25px;
    color: #505050;
    transform: translateY(25px);
    cursor: pointer;
}

.collapse-thumb:hover {
    color: var(--el-color-primary);
}

.collapse-enter-from,
.collapse-leave-to {
    position: absolute;
    transform: translateX(-100%);
}

.collapse-enter-active,
.collapse-leave-active {
    transition: 0.5s;
}

.collapse-enter-to,
.collapse-leave-from {
    transform: translateX(0);
}
</style>