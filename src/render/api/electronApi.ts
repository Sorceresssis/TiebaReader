

/**
 * 用于打开外部 URL 或文件资源。可以使用这个方法在用户默认的浏览器中打开一个网页。
 * @param hyperlink
 */
export function openInBrowser(hyperlink: string | null) {
    if (!hyperlink) return
    window.electronAPI.openInBrowser(hyperlink)
}