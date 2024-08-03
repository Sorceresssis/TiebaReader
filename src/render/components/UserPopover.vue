<template>
    <el-popover trigger="hover"
                :width="popoverWidth"
                :show-after="showAfter">
        <template #reference>
            <slot></slot>
        </template>

        <div class="user-popover">
            <div class="up-c">
                <div class="user-popover-avatar">
                    <div class="avatar-wrap">
                        <el-avatar :src="user.avatar"
                                   shape="square"
                                   size="large"
                                   @error="handleUserAvatarError" />
                    </div>
                </div>
                <div class="nickname-row">
                    <span class="nickname"> {{ user.nickname }}</span>
                </div>
                <div class="user-popover-upc-row">
                    <div>
                        <span v-if="user.gender === 1"
                              class="male">男</span>
                        <span v-else-if="user.gender === 2"
                              class="female">女</span>
                        <span v-else>性别未知</span>
                    </div>
                    <div><span>吧龄: </span><span class="count">{{ user.age }}</span><span>年</span> </div>
                    <div>
                        <span>IP: </span>
                        <span v-if="user.ip === ''"
                              class="count">{{ user.ip }}</span>
                        <span v-else> 未知 </span>
                    </div>
                </div>
                <div class="user-popover-upc-row">
                    <div> <span>发帖: </span><span class="count">{{ user.post_num }}</span></div>
                    <div> <span>被赞: </span><span class="count">{{ user.agree_num }}</span></div>
                    <div> <span>粉丝: </span><span class="count">{{ user.fan_num }}</span></div>
                </div>
            </div>
            <div>
                <table cellspacing="0">
                    <tbody>
                        <tr>
                            <th> ID </th>
                            <td>{{ user.id ? user.id : '未知' }}</td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <td>{{ user.username ? user.username : '未知' }}</td>
                        </tr>
                        <tr>
                            <th>Portrait</th>
                            <td>{{ user.portrait ? user.portrait : '未知' }}</td>
                        </tr>
                        <tr>
                            <th>Tieba_Uid</th>
                            <td>{{ user.tieba_uid ? user.tieba_uid : '未知' }}</td>
                        </tr>
                        <tr v-if="user.sign">
                            <th>Sign</th>
                            <td>{{ user.sign }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </el-popover>
</template>

<script setup lang="ts">
import ResourcePath from '@/constant/resource_path';
import { ElAvatar, ElPopover } from 'element-plus';

const popoverWidth = '360px'
const showAfter = 500

const props = defineProps<{
    user: VO.User
}>();

const handleUserAvatarError = function () {
    props.user.avatar = ResourcePath.USER_AVATAR_DEFAULT
}

</script>

<style>
.user-popover {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.up-c {
    width: 100%;
    display: flex;
    padding: 6px 0 0 100px;
    position: relative;
    flex-direction: column;
    margin-bottom: 10px;
}

.user-popover-avatar {
    display: flex;
    position: absolute;
    left: 5px;
    width: 100px;
}

.user-popover-avatar .el-avatar {
    width: 80px;
    height: 80px;
}

.user-popover .nickname-row {
    min-height: 30px;
    font-weight: 700;
    font-size: 16px;
}

.user-popover-upc-row {
    display: flex;
    height: 30px;
    align-items: center;
    gap: 10px;
    font-size: 12px;
}

.user-popover .male {
    color: #2196F3;
}

.user-popover .female {
    color: #f44336;
}

.user-popover tr {
    margin: 4px 0 !important;
    font-size: 12px;
}

.user-popover th {
    min-width: 70px;
    height: 22px;
    text-align: right;
    box-sizing: border-box;
    display: flex;
    align-items: start;
    justify-content: start;
}

.user-popover td {
    padding-bottom: 2px;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
}
</style>