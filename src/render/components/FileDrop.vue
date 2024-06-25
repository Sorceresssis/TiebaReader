<template>
    <div class="file-drop__drag-drop-area"
         @dragover.prevent
         @drop.stop="onDrop($event)"
         @dragleave.stop="onDragleave"
         @dragenter.stop="onDragenter"
         :style="[isDragenter ? 'background-color: #E8F0FE;' : '']">
        <div v-if="!isDragenter"
             class="file-drop__drag-drop-title-container">
            <span> 将数据拖拽到此处, 或者 </span>
            <span class="file-drop__open-dialog"
                  @click="handleOpenDialog"> 选择数据路径 </span>
        </div>
        <div v-if="!isDragenter"
             class="file-drop__divider">
            <el-divider />
            <div v-if="label"
                 class="file-drop__divider-label"> {{ label }} </div>
            <el-divider />
        </div>
        <div v-if="!isDragenter"
             class="file-drop__input-container">
            <el-input v-model="dataDirPathInput"
                      type="text"
                      :formatter="pathFormatter"
                      clearable
                      placeholder="粘贴数据的路径"
                      @keyup.enter="handleOpenCopyPath" />
            <el-button style="min-width: 80px;"
                       @click="handleOpenCopyPath"> 打开 </el-button>
        </div>
        <div v-if="isDragenter"
             class="file-drop__drag-drop-title-container">
            <span> 将数据放到此处 </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDivider, ElInput, ElButton, ElMessage } from 'element-plus';

const props = withDefaults(defineProps<{
    type?: OpenDialogType, // 文件类型
    multi?: boolean, // 多选
    label?: string,
}>(), {
    type: 'file',
    multi: true,
    label: '',
})

const emits = defineEmits<{
    (e: 'open', paths: string[]): void
}>()


// 拖拽过程中进入子元素会触发dragleave事件的解决方法
// https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
// floor 62 
const isDragenter = ref<boolean>(false)
const onDragenter = (e: DragEvent) => {
    e.preventDefault();
    // 拖动的是文件才改变样式
    if (e.dataTransfer?.types.includes('Files')) {
        isDragenter.value = true;
    }
}

const onDragleave = (e: DragEvent) => {
    e.preventDefault();
    // 这个代码的含义是如果变化的元素输入被drag监听元素的子元素就表示还没有真正的离开
    if ((e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement)) return
    isDragenter.value = false;
}
const onDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragenter.value = false;
    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;
    if (!props.multi && files.length > 1) {
        ElMessage.closeAll();
        ElMessage.error('只能拖拽一个文件夹');
        return;
    }

    const paths = []
    for (let i = 0; i < files.length; i++) {
        paths.push(files[i].path)
    }

    emits('open', paths)
};

const handleOpenDialog = function () {
    window.electronAPI.openDialog(props.type, props.multi, '选择数据路径').then(p => {
        if (p.length > 0) {
            emits('open', p)
        }
    })
}

const dataDirPathInput = ref<string>('')

const pathFormatter = function (value: string): string {
    // 把 '\','\\' 替换成 '/'
    return value.replace(/\\+/g, '/');
}

const handleOpenCopyPath = function () {
    if (dataDirPathInput.value.trim() === '') return
    emits('open', [dataDirPathInput.value.trim()])
}

</script>

<style>
.file-drop__drag-drop-area {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
    background: rgb(248, 249, 250);
    border: 1px dashed rgb(189, 193, 198);
    border-radius: 8px;
    box-sizing: border-box;
    color: #474747ff;
}

.file-drop__drag-drop-title-container {
    align-items: center;
    display: inline-flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
}

.file-drop__open-dialog {
    margin-left: 4px;
    color: rgb(25, 103, 210);
    cursor: pointer;
    text-underline-position: under;
}

.file-drop__open-dialog:hover {
    text-decoration: underline;
}

.file-drop__divider {
    display: flex;
    height: 20px;
    box-sizing: border-box;
    align-items: center;
    overflow: hidden;
}

.file-drop__divider-label {
    margin: 20px;
    font-size: 14px;
    color: #474747ff;
}

.file-drop__input-container {
    display: flex;
    margin-top: 14px;
    gap: 20px;
}
</style>