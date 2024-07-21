import n_fs from "node:fs";
import n_path from "node:path";
import { injectable, inject } from "inversify";
import container from "../container/container";
import InjectType from "../container/inject_type";
import Result from "../pojo/Result";
import ThreadInfoDTO from "../dto/ThreadInfoDTO";
import ScrapeDataSourceDirStruct from "../config/scrapeDataSourceDirStruct";
import type ScrapeInfoService from "./ScrapeInfoService";
import type PostService from "./PostService";


@injectable()
class ThreadService {
    public constructor(
        @inject(InjectType.ScrapeDataPath) private scrapeDataPath: string,
        @inject(InjectType.ThreadID) private tid: number,
        @inject(InjectType.ScrapeInfoService) private scrapeInfoService: ScrapeInfoService,
    ) { }

    public async getThreadInfo(): Promise<Result> {
        const scrapeInfoRes = await this.scrapeInfoService.get()
        if (scrapeInfoRes.code) return scrapeInfoRes

        const scrapeInfo: VO.ScrapeInfo = scrapeInfoRes.data

        const threadRes = await this.getThread()
        const thread: VO.Thread = threadRes.data

        const forumRes = await this.getForum()
        const forum: VO.Forum = forumRes.data

        return Result.ok(new ThreadInfoDTO(
            scrapeInfo,
            thread,
            forum,
        ));
    }

    public async getThreadPreview(): Promise<DTO.ThreadPreview | undefined> {
        const threadRes = await this.getThread()
        const thread: Entity.Thread = threadRes.data

        const post = container.get<PostService>(InjectType.PostService).getPost(thread.post_id)

        if (!post) return

        return {
            thread: thread,
            user: post.user,
            contents: post.contents
        }
    }

    public async getThread(): Promise<Result> {
        const threadPath = ScrapeDataSourceDirStruct.getThreadPath(this.scrapeDataPath, this.tid)
        try {
            await n_fs.promises.access(threadPath);

            const data: VO.Thread = JSON.parse(await n_fs.promises.readFile(threadPath, 'utf8'));

            return Result.ok(data)
        } catch (e: any) {
            if (e.code === 'ENOENT') {
                return Result.error('thread.json 文件不存在, 数据源可能损坏');
            } else {
                throw e;
            }
        }
    }

    public async getForum(): Promise<Result> {
        const forumPath = ScrapeDataSourceDirStruct.getForumPath(this.scrapeDataPath, this.tid)
        try {
            await n_fs.promises.access(forumPath)

            const data: VO.Forum = JSON.parse(await n_fs.promises.readFile(forumPath, 'utf8'))
            const forumAvatarDir = ScrapeDataSourceDirStruct.getForumAvatarDir(this.scrapeDataPath, this.tid)
            data.small_avatar = 'file:///' + n_path.join(forumAvatarDir, data.small_avatar)
            data.origin_avatar = 'file:///' + n_path.join(forumAvatarDir, data.origin_avatar)
            return Result.ok(data)
        } catch (e: any) {
            if (e.code === 'ENOENT') {
                return Result.error('forum.json 文件不存在, 数据源可能损坏');
            } else {
                throw e;
            }
        }
    }
}


export default ThreadService;