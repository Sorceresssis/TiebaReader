import { ipcMain, dialog, IpcMainInvokeEvent } from "electron"

/*
filters: [
{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] },
{ name: 'VIDEO', extensions: ['mkv', 'avi', 'mp4'] },
{ name: 'Custom File Type', extensions: ['as'] },
{ name: 'All Files', extensions: ['*'] } ] 
*/
export default function dialogIpcMain() {
    ipcMain.handle('dialog:open', async (e: IpcMainInvokeEvent, type: OpenDialogType, multiSelect: boolean, title?: string): Promise<string[]> => {
        const option: Electron.OpenDialogOptions = { filters: [], properties: [] }
        option.properties!.push('createDirectory', 'promptToCreate', 'dontAddToRecent')
        //判断选择的是文件还是文件夹
        if (type === 'dir') {
            option.properties!.push('openDirectory')
        }
        else {
            option.properties!.push('openFile')
            switch (type) {
                case 'file':
                    option.filters!.push({ name: 'All Files', extensions: ['*'] })
                    break
                case 'image':
                    option.filters!.push({ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp', 'avif'] })
                    break
                case 'video':
                    option.filters!.push({ name: 'Videos', extensions: ['mkv', 'avi', 'mp4'] })
                    break
            }
        }
        // 判断是否多选
        if (multiSelect) option.properties!.push('multiSelections')
        if (title) option.title = title
        const { filePaths } = await dialog.showOpenDialog(option)
        return filePaths
    })
}