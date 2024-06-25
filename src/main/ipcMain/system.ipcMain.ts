import { clipboard, ipcMain, IpcMainInvokeEvent, shell } from "electron"
import nodePath from "path"
import fs from "fs"
import Result from "../pojo/Result"

export default function systemIpcMain() {
    // 用系统默认方式打开url
    ipcMain.handle('system:openInBrowser', (e: IpcMainInvokeEvent, hyperlink: string) => {
        if (!hyperlink) return
        const protocolRegex = /^(http|https):\/\//
        if (!protocolRegex.test(hyperlink)) {
            hyperlink = `https://${hyperlink}`
        }
        shell.openExternal(hyperlink)
    })

    // 打开资源管理器中的路径如果是文件夹，直接打开文件夹。如果是文件，打开文件所在的文件夹，滚动到文件的位置并高亮标记
    ipcMain.handle('system:openInExplorer', async (
        e: IpcMainInvokeEvent,
        path: string,
        method?: 'showItemInFolder' | 'openPath'
    ): Promise<Result> => {
        const r = await new Promise<Result>((resolve) => {
            path = nodePath.normalize(path)

            fs.stat(path, (err, stats) => {
                if (err) {
                    resolve(Result.error(err.message))
                    return
                }

                if (stats.isDirectory()) {
                    if (method === 'showItemInFolder') {
                        shell.showItemInFolder(path)
                    } else if (method === 'openPath' || method === void 0) {
                        shell.openPath(path)
                    }
                } else {
                    // 文件只能用showItemInFolder打开
                    shell.showItemInFolder(path)
                }

                resolve(Result.ok())
            })
        })
        return r
    })

    // 复制到剪贴板
    ipcMain.handle('system:writeClipboard', (e: IpcMainInvokeEvent, text: string) => {
        clipboard.writeText(text)
    })
}