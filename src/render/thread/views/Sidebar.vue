<template>
    <div class="sidebar scrollbar-y-w4">
        <div class="sidebar-block">
            <h3 class="sidebar-block__title">吧信息</h3>
            <div class="forum-avatar">
                <div class="avatar-wrap">
                    <el-avatar size="large"
                               shape="square"
                               style="width: 80px; height: 80px;"
                               :src="forum.origin_avatar" />
                </div>
            </div>
            <table cellspacing="0">
                <tbody>
                    <tr>
                        <th> 吧名 </th>
                        <td>{{ forum.name }}吧 </td>
                    </tr>
                    <tr>
                        <th> 分类 </th>
                        <td>{{ forum.category }} </td>
                    </tr>
                    <tr>
                        <th> 子分类 </th>
                        <td> {{ forum.subcategory }} </td>
                    </tr>
                    <tr>
                        <th> 关注 </th>
                        <td class="count"> {{ forum.member_num }} </td>
                    </tr>
                    <tr>
                        <th> 主题帖 </th>
                        <td class="count"> {{ forum.thread_num }} </td>
                    </tr>
                    <tr>
                        <th> 帖子 </th>
                        <td class="count"> {{ forum.post_num }} </td>
                    </tr>
                    <tr>
                        <th>Slogan</th>
                        <td> {{ forum.slogan }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="sidebar-block">
            <h3 class="sidebar-block__title">数据信息</h3>
            <table cellspacing="0">
                <tbody>
                    <tr>
                        <th> 爬取时间 </th>
                        <td> {{ formatTimestampToDateTimeString(scrapeInfo.create_time) }} </td>
                    </tr>
                    <tr>
                        <th> 爬取版本 </th>
                        <td class="count"> {{ scrapeInfo.scraper_version }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="sidebar-block">
            <h3 class="sidebar-block__title">其他操作</h3>
            <div>
                <div v-if="thread.is_share">
                    <span class="link"
                          @click="openShareOriginThread"> 打开被分享的原帖 </span>
                </div>
                <div>
                    <span class="link"
                          @click="openInBrowser(`https://tieba.baidu.com/p/${thread.id}`)">打开帖子原网页</span>
                </div>
                <div>
                    <span class="link"
                          @click="openThreadSourceInExplorer">在资源管理器中打开</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, readonly, ref } from 'vue';
import { formatTimestampToDateTimeString } from '@/utils/time';
import { openInBrowser } from '@/api/electronApi';

const threadSource = readonly(inject<RP.ThreadSource>('threadSource')!)
const scrapeInfo = readonly(inject<VO.ScrapeInfo>('scrapeInfo')!)
const forum = readonly(inject<VO.Forum>('forum')!)
const thread = inject<VO.Thread>('thread')!

const openShareOriginThread = function () {
    window.appAPI.createThreadWindow(threadSource.path, thread.share_origin)
}

const openThreadSourceInExplorer = function () {
    window.electronAPI.openInExplorer(threadSource.path, 'showItemInFolder')
}

</script>

<style>
.sidebar {
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 100%;
    padding: 20px 16px 20px 20px;
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 50;
    font-size: 14px;
    box-shadow:
        0px 0px 0.3px rgba(0, 0, 0, 0.033),
        0px 0px 1.1px rgba(0, 0, 0, 0.044),
        0px 0px 5px rgba(0, 0, 0, 0.07);
    gap: 20px 0;
}

@media (max-width: 1000px) {
    .sidebar {
        position: absolute;
        left: 0;
    }
}

.forum-avatar {
    margin-bottom: 15px;
    display: flex;
}

.sidebar-block {}

.sidebar-block__title {
    font-weight: 700;
    font-size: 16px;
    margin: 15px 0;
    user-select: none;
}

.sidebar-block table {
    font-size: 13px !important;
    color: #333;
}

.sidebar-block tr {
    margin: 4px 0 !important;
}

.sidebar-block th {
    min-width: 70px;
    height: 22px;
    text-align: right;
    box-sizing: border-box;
    display: flex;
    align-items: start;
    justify-content: start;
}

.sidebar-block td {
    padding-bottom: 2px;
}
</style>