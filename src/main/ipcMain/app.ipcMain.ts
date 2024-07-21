import { ipcMain, IpcMainInvokeEvent } from 'electron'
import n_fs from "node:fs"
import threadWindow from '../windows/thread.window'
import container, { rebindDataSourcesDeps } from '../container/container'
import InjectType from '../container/inject_type'
import scrapeDataSourceDirStruct from '../config/scrapeDataSourceDirStruct'
import Result from '../pojo/Result'
import type ScrapeInfoService from '../services/ScrapeInfoService'


export default function appIpcMain() {
    ipcMain.handle('window:createThreadWindow', async (e: IpcMainInvokeEvent, path: string, tid?: number): Promise<Result> => {
        try {
            const stats = await n_fs.promises.lstat(path);

            if (stats.isFile()) return Result.error('路径指向的是文件，请选择文件夹')

            // 启动Thread窗口,不加载数据，只是确保这个窗口的数据源是正确的。
            rebindDataSourcesDeps(path, tid)

            // scrape_info.josn 不存在报错：
            const scrapeInfoRes = await container.get<ScrapeInfoService>(InjectType.ScrapeInfoService).get()

            if (scrapeInfoRes.code !== 0) return scrapeInfoRes
            const scrapeInfo = scrapeInfoRes.data as Entity.ScrapeInfo
            if (!tid) tid = scrapeInfo.main_thread

            const threadDir = scrapeDataSourceDirStruct.getThreadsDir(path, tid)
            if (!n_fs.existsSync(threadDir)) return Result.error('数据源损坏')

            threadWindow.createWindow({ path, tid })
            return Result.ok()
        } catch (e: any) {
            if (e.code === 'ENOENT') {
                return Result.error('路径不存在');
            } else {
                throw e;
            }
        }

    })
} 