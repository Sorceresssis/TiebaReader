import appIpcMain from './app.ipcMain'
import dataIpcMain from './data.ipcMain'
import dialogIpcMain from './dialog.ipcMain'
import systemIpcMain from './system.ipcMain'

export default function IPCMain() {
    appIpcMain()
    dataIpcMain()
    dialogIpcMain()
    systemIpcMain()
}