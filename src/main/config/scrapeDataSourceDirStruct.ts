import n_path from 'node:path'

class ScrapeDataSourceDirStruct {
    public static getScrapeInfoPath(dataSource: string): string {
        return n_path.join(dataSource, 'scrape_info.json')
    }

    public static getThreadsDir(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString())
    }

    public static getForumPath(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'forum.json')
    }

    public static getForumAvatarDir(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'forum_avatar')
    }

    public static getThreadPath(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'thread.json')
    }

    public static getContentDBPath(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'content.db')
    }

    public static getUserAvatarDir(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'user_avatar')
    }

    public static getPostImagesDir(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'post_assets', 'images')
    }

    public static getPostVideosDir(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'post_assets', 'videos')
    }

    public static getPostVoicesDir(dataSource: string, tid: number): string {
        return n_path.join(dataSource, 'threads', tid.toString(), 'post_assets', 'voices')
    }
}


export default ScrapeDataSourceDirStruct;