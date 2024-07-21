import n_fs from "node:fs"
import { injectable, inject } from "inversify";
import InjectType from "../container/inject_type";
import Ajv from "ajv";
import { SCRAPE_INFO_SCHEMA } from "../config/schema";
import DataDirStruct from "../config/scrapeDataSourceDirStruct";
import Result from "../pojo/Result";


@injectable()
class ScrapeInfoService {
    public constructor(
        @inject(InjectType.ScrapeDataPath) private dataSource: string,
        private scrapeInfoValidator = new Ajv().compile(SCRAPE_INFO_SCHEMA),
    ) { }

    public async get(): Promise<Result> {
        const scrapeInfoPath = DataDirStruct.getScrapeInfoPath(this.dataSource)
        try {
            await n_fs.promises.access(scrapeInfoPath);

            const data: Entity.ScrapeInfo = JSON.parse(await n_fs.promises.readFile(scrapeInfoPath, 'utf8'));

            // 开始检查数据是否正确
            if (!this.scrapeInfoValidator(data))
                throw new Error('数据源可能损坏, 导致数据加载失败');

            return Result.ok(data)
        } catch (e: any) {
            if (e.code === 'ENOENT') {
                return Result.error('scrape_info.json 文件不存在, 请选择正确的数据源目录');
            } else {
                throw e;
            }
        }
    }
}


export default ScrapeInfoService;