import { BrowserWindow, app, Menu, Tray } from "electron"
import n_path from "node:path"
import { createWindow } from "./windows/main.window"
import IPCMain from './ipcMain'

async function bootstrap() {
    Menu.setApplicationMenu(null)

    app.on("ready", () => {
        // 通信
        IPCMain()
        // 主窗口
        let mainWin = createWindow()  // 启动窗口

        // 托盘 
        const tray = new Tray(n_path.join(__dirname, './assets/icons/favicon.ico'))
        tray.setToolTip('Tieba Reader')
        tray.setContextMenu(Menu.buildFromTemplate([
            {
                label: '显示主窗口',
                click: () => {
                    mainWin.isDestroyed() ? mainWin = createWindow() : mainWin.show()
                }
            },
            {
                label: '退出',
                role: 'quit'
            }
        ]))

        tray.on('click', () => {
            mainWin.isDestroyed() ? mainWin = createWindow() : mainWin.show()
        })

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                tray.destroy()
                app.quit();
            }
        });
    });
}

bootstrap();
