<template>
    <div id="page">
        <div id="header">
            <div class="nav"> </div>
            <div class="nav">
                <div class="nav-item">
                    <a class="gb_I"
                       @click.prevent="openInBrowser('https://github.com/Sorceresssis/TiebaReader')">
                        Reader
                    </a>
                </div>
                <div class="nav-item">
                    <a class="gb_I"
                       @click.prevent="openInBrowser('https://github.com/Sorceresssis/TiebaScraper')">
                        Scraper
                    </a>
                </div>
            </div>
        </div>
        <div id="main">
            <h1 id="logo">Tieba Reader</h1>
            <div id="drag-dialog">
                <file-drop type="dir"
                           :multi="false"
                           label="或"
                           @open="handleFileDropOpen" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import FileDrop from "@/components/FileDrop.vue";
import { openInBrowser } from "./api/electronApi";
import { ElMessage } from "element-plus";

const handleFileDropOpen = async function (paths: string[]) {
    if (paths[0]) {
        const res = await window.appAPI.createThreadWindow(paths[0]);
        if (res.code === 1) {
            ElMessage.error(res.msg)
        }
    }
}

</script>

<style>
#page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F6F6F8;
}

#header {
    display: flex;
    justify-content: space-between;
    padding: 8px 40px;
}

.nav {
    display: flex;
    height: 48px;
    box-sizing: border-box;
    padding: 0 4px;
    line-height: 48px;
}

.nav-item {
    display: inline-block;
    padding-left: 15px;
}

.gb_I {
    display: inline-block;
    line-height: 24px;
    vertical-align: middle;
    color: rgba(0, 0, 0, .87);
    font-size: 13px;
    cursor: pointer;
}

.gb_I:hover {
    text-decoration: underline;
}

#main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

#logo {
    display: flex;
    width: 500px;
    justify-content: center;
    margin-bottom: 38px;
    font-size: 50px;
    user-select: none;
}

#drag-dialog {
    width: 700px;
    height: 400px;
    padding: 20px;
    border-radius: 25px;
    box-sizing: border-box;
    box-shadow:
        color-mix(in srgb, var(--cr-shadow-color) 30%, transparent) 0 1px 3px 0,
        color-mix(in srgb, var(--cr-shadow-color) 15%, transparent) 0 4px 8px 3px;
}
</style>