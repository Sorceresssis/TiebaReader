import { app, BrowserWindow } from "electron"
import windowManager from "../utils/windowManager"
import n_path from "node:path"

const isPackaged = app.isPackaged

export function createWindow(threadSource: RP.ThreadSource): BrowserWindow {
    const win = new BrowserWindow({
        width: 1050,
        height: 649,
        minWidth: 750,
        minHeight: 600,
        show: false,
        backgroundColor: "#ffffff",
        webPreferences: {
            preload: n_path.resolve(__dirname, "../preload/index.js"),
            sandbox: true, // 开启沙箱模式
            webSecurity: isPackaged,
        }
    })

    windowManager.add(win)

    if (isPackaged) {
        win?.loadFile(n_path.resolve(__dirname, "../../render/thread/index.html"))
    } else {
        win?.loadURL(`http://localhost:${process.env.PORT || 5173}/thread/`)
        win.webContents.openDevTools()
    }

    win.once('ready-to-show', () => {
        win.webContents.send('window:acceptThreadWindowParams', threadSource)
        win.show()
    })

    win.on('closed', () => {
        win.destroy()
    })
    return win
}

export default { createWindow }