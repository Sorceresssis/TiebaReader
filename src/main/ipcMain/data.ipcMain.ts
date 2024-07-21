import { ipcMain, IpcMainInvokeEvent } from 'electron'
import container, { rebindDataSourcesDeps } from '../container/container'
import InjectType from '../container/inject_type'
import Result from '../pojo/Result'
import ContentDB from '../db/content_db'
import type UserService from '../services/UserService'
import type ThreadService from '../services/ThreadService'
import type PostService from '../services/PostService'
import type PostsDTO from '../dto/PostsDTO'
import type CommentsDTO from '../dto/CommentsDTO'


export default function dataIpcMain() {
    ipcMain.handle('data:getThreadInfo', async (
        e: IpcMainInvokeEvent,
        threadSource: RP.ThreadSource
    ): Promise<Result> => {
        rebindDataSourcesDeps(threadSource.path, threadSource.tid)
        const threadService = container.get<ThreadService>(InjectType.ThreadService)
        return await threadService.getThreadInfo()
    })

    ipcMain.handle('data:getThreadPreview', async (
        e: IpcMainInvokeEvent,
        threadSource: RP.ThreadSource,
    ): Promise<Result> => {
        let contentDB
        try {
            contentDB = new ContentDB(threadSource.path, threadSource.tid)
            rebindDataSourcesDeps(threadSource.path, threadSource.tid, contentDB)
            const threadService = container.get<ThreadService>(InjectType.ThreadService)

            const preview = await threadService.getThreadPreview()

            return preview ? Result.ok(preview) : Result.error('thread 不存在')
        } catch (e: any) {
            return Result.error(e.message)
        } finally {
            contentDB?.close()
        }
    })

    ipcMain.handle('data:getPosts', (
        e: IpcMainInvokeEvent,
        threadSource: RP.ThreadSource,
        queryParams: RP.GetPostsQueryParams
    ): Result<PostsDTO> => {
        let contentDB
        try {
            contentDB = new ContentDB(threadSource.path, threadSource.tid)
            rebindDataSourcesDeps(threadSource.path, threadSource.tid, contentDB)

            const postService = container.get<PostService>(InjectType.PostService)

            const data = postService.getPosts(queryParams)

            return Result.ok(data)
        } catch (e: any) {
            return Result.error(e.message)
        } finally {
            contentDB?.close()
        }
    })

    ipcMain.handle('data:getComments', (
        e: IpcMainInvokeEvent,
        threadSource: RP.ThreadSource,
        queryParams: RP.GetCommentsQueryParams
    ): Result<CommentsDTO> => {
        let contentDB
        try {
            contentDB = new ContentDB(threadSource.path, threadSource.tid)
            rebindDataSourcesDeps(threadSource.path, threadSource.tid, contentDB)

            const postService = container.get<PostService>(InjectType.PostService)
            const { pid, pn, rn, sort } = queryParams
            const data = postService.getComments(pid, pn, rn, sort)
            return Result.ok(data)
        } catch (e: any) {
            return Result.error(e.message)
        } finally {
            contentDB?.close()
        }
    })

    ipcMain.handle('data:getUserInfo', (e: IpcMainInvokeEvent,
        threadSource: RP.ThreadSource,
        id: number
    ): Result<VO.User> => {
        let contentDB
        try {
            contentDB = new ContentDB(threadSource.path, threadSource.tid)
            rebindDataSourcesDeps(threadSource.path, threadSource.tid, contentDB)

            const userService = container.get<UserService>(InjectType.UserService)
            const user = userService.getUserInfo(id)
            return user ? Result.ok(user) : Result.error('用户不存在')
        } catch (e: any) {
            return Result.error(e.message)
        } finally {
            contentDB?.close()
        }
    })

    ipcMain.handle('data:searchPost', (e: IpcMainInvokeEvent,
        threadSource: RP.ThreadSource,
        keyword: string
    ) => {
        let contentDB
        try {
            contentDB = new ContentDB(threadSource.path, threadSource.tid)
            rebindDataSourcesDeps(threadSource.path, threadSource.tid, contentDB)

            // TODO 搜索
        } catch (e: any) {
            return Result.error(e.message)
        } finally {
            contentDB?.close()
        }
    })
}