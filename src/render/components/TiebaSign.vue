<template>
    <div class="tieba-sign">
        <div class="tieba-sign__divider">
            <el-divider style="width: 100px;" />
            <div class="tieba-sign__label"> 小尾巴 </div>
            <el-divider style="width: 200px;" />
        </div>
        <div class="tieba-sign__content">
            金佛寺建瓯降低哦i啊送饭的窘境哦{{ text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElDivider } from 'element-plus';

defineProps<{
    text: string
}>()

</script>

<style>
.tieba-sign {
    margin-bottom: 10px;
}

.tieba-sign__divider {
    display: flex;
    height: 20px;
    box-sizing: border-box;
    align-items: center;
    overflow: hidden;
}

.tieba-sign__label {
    margin: 0 20px;
    font-size: 13px;
    color: #9499A0;
}

.tieba-sign__content {
    margin-top: 6px;
    font-size: 13px;
    color: #18191C;
}
</style>