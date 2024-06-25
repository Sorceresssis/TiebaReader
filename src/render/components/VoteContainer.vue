<template>
    <div class="vote-container">
        <h3 class="vote-title"> 投票 • {{ voteInfo.title }}</h3>
        <div class="vote-option-list">
            <div v-for="option in voteInfo.options"
                 class="vote-option">
                <div>{{ option.text }}</div>

                <div>{{ option.vote_num }}票| {{ Math.round((option.vote_num / voteInfo.total_vote) * 100) }}% </div>
            </div>
        </div>
        <div class="vote-tail">
            <span v-if="voteInfo.is_multi">多选</span>
            <span v-else>单选</span>
            <span>, 已有</span>
            <span class="count">{{ voteInfo.total_user }}</span>
            <span>位吧友参与投票</span>
        </div>
    </div>
</template>

<script setup lang="ts">


defineProps<{
    voteInfo: VO.Thread['vote_info']
}>()

</script>

<style>
.vote-container {
    --vote-border-color: #DFDFDF;
    width: 100%;
    max-width: 500px;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    background-color: #F7F7F9;
    border-radius: 5px;
    border: 1px solid var(--vote-border-color);
}

.vote-title {
    margin-bottom: 10px;
}

.vote-option-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
}

.vote-option {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border: 1px solid var(--vote-border-color);
    border-radius: 5px;
    background-color: #fff;
}

.vote-tail {
    margin-top: 10px;
    font-size: 13px;
    color: #888888;
    box-sizing: border-box;
}
</style>