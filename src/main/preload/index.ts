import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"


contextBridge.exposeInMainWorld('dataAPI', {
    getThreadInfo: (
        threadSource: RP.ThreadSource
    ) => ipcRenderer.invoke('data:getThreadInfo', threadSource),

    getThreadPreview: (
        threadSource: RP.ThreadSource
    ) => ipcRenderer.invoke('data:getThreadPreview', threadSource),

    getPosts: (
        threadSource: RP.ThreadSource,
        queryParams: RP.GetPostsQueryParams
    ) => ipcRenderer.invoke('data:getPosts', threadSource, queryParams),

    getComments: (
        threadSource: RP.ThreadSource,
        queryParams: RP.GetCommentsQueryParams
    ) => ipcRenderer.invoke('data:getComments', threadSource, queryParams),

    getUserInfo: (
        threadSource: RP.ThreadSource,
        id: number,
    ) => ipcRenderer.invoke('data:getUserInfo', threadSource, id),
})

contextBridge.exposeInMainWorld('electronAPI', {
    openDialog: (
        type: OpenDialogType,
        multiSelect: boolean,
        title?: string
    ) => ipcRenderer.invoke('dialog:open', type, multiSelect, title),

    openInBrowser: (
        hyperlink: string
    ) => ipcRenderer.invoke('system:openInBrowser', hyperlink),

    openInExplorer: (
        path: string,
        method?: 'showItemInFolder' | 'openPath'
    ) => ipcRenderer.invoke('system:openInExplorer', path, method),

    openFile: (
        path: string
    ) => ipcRenderer.invoke('system:openFile', path),

    writeClipboard: (
        text: string
    ) => ipcRenderer.invoke('system:writeClipboard', text),

    electron: process.versions.electron,

    chrome: process.versions.chrome,

    node: process.versions.node,
})

/**
 * 窗口的创建、关闭、改变显示状态
 * 配置文件的修改
 * 
 */
contextBridge.exposeInMainWorld('appAPI', {
    createThreadWindow: (
        path: string,
        tid?: number,
    ) => ipcRenderer.invoke('window:createThreadWindow', path, tid),

    acceptThreadWindowParams: (
        callback: (e: IpcRendererEvent, threadSource: RP.ThreadSource) => void
    ) => ipcRenderer.on('window:acceptThreadWindowParams', callback),
})