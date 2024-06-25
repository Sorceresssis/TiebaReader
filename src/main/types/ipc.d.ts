export interface IDataAPI {
    getThreadInfo: (
        threadSource: RP.ThreadSource
    ) => Promise<Result<DTO.ThreadInfo>>

    getThreadPreview: (
        threadSource: RP.ThreadSource
    ) => Promise<Result<DTO.ThreadPreview>>

    getPosts: (
        threadSource: RP.ThreadSource,
        queryParams: RP.GetPostsQueryParams
    ) => Promise<Result<DTO.Posts>>

    getComments: (
        threadSource: RP.ThreadSource,
        queryParams: RP.GetCommentsQueryParams
    ) => Promise<Result<DTO.Comments>>

    getUserInfo: (
        threadSource: RP.ThreadSource,
        id: number,
    ) => Promise<Result<DTO.User>>
}

export interface IElectronAPI {
    openDialog: (
        type: OpenDialogType,
        multiSelect: boolean,
        title?: string
    ) => Promise<string[]>

    openInBrowser: (
        hyperlink: string
    ) => Promise<void>

    openInExplorer: (
        path: string,
        method?: 'showItemInFolder' | 'openPath'
    ) => Promise<Result>

    openFile: (
        path: string
    ) => Promise<Result>

    writeClipboard: (
        text: string
    ) => Promise<void>
}

export interface IAppAPI {
    createThreadWindow: (
        path: string,
        tid?: number,
    ) => Promise<DTO.Result>


    acceptThreadWindowParams: (
        callback: (e: IpcRendererEvent, threadSource: RP.ThreadSource,) => void
    ) => void
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
        dataAPI: IDataAPI
        appAPI: IAppAPI
    }
}