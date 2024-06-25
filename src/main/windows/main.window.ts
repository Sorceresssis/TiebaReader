import { BrowserWindow, app } from "electron"
import windowManager from "../utils/windowManager"
import n_path from "node:path"

const isPackaged = app.isPackaged

export function createWindow(): BrowserWindow {
    const win = new BrowserWindow({
        width: 1050,
        height: 649,
        minWidth: 650,
        minHeight: 600,
        show: false,
        backgroundColor: "#ffffff",
        webPreferences: {
            preload: n_path.resolve(__dirname, "../preload/index.js"),
            sandbox: true,
            webSecurity: true,
        }
    })
    windowManager.add(win)

    if (isPackaged) {
        win?.loadFile(n_path.resolve(__dirname, "../../render/index.html"))
    } else {
        win?.loadURL(`http://localhost:${process.env.PORT || 5173}`)
        win.webContents.openDevTools()
    }

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', () => {
        win.destroy()
    })
    return win
}

export default { createWindow }