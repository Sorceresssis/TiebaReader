import DatabaseConstructor from "better-sqlite3";
import n_fs from "node:fs";
import ScrapeDataSourceDirStruct from '../config/scrapeDataSourceDirStruct';

class ContentDB extends DatabaseConstructor {
    public constructor(scrapeDataSource: string, tid: number) {
        const path = ScrapeDataSourceDirStruct.getContentDBPath(scrapeDataSource, tid)

        if (!n_fs.existsSync(path)) {
            throw new Error('content.db not found');
        }

        super(path);

        // 开启wal模式
        this.pragma('journal_mode = WAL');
    }
}

export default ContentDB