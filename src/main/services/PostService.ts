import n_path from "node:path";
import { injectable, inject } from "inversify";
import InjectType from "../container/inject_type";
import ScrapeDataSourceDirStruct from "../config/scrapeDataSourceDirStruct";
import { CommentSortType } from "../dao/PostDao";
import type PostDao from "../dao/PostDao";
import type UserService from "./UserService";
import PostVO from "../vo/PostVO";
import CommentVO from "../vo/CommentVO";
import Page from "../pojo/Page";
import PostsDTO from "../dto/PostsDTO";
import CommentsDTO from "../dto/CommentsDTO";

export const enum ContentFragmentType {
    TEXT = 1,
    EMOJI = 2,
    IMAGE = 3,
    AT = 4,
    LINK = 5,
    TIEBA_PLUS = 6,
    VIDEO = 7,
    VOICE = 8,
}


@injectable()
class PostService {
    private postImagesDir: string
    private postVideosDir: string
    private postVoicesDir: string

    public constructor(
        @inject(InjectType.ScrapeDataPath) private scrapeDataPath: string,
        @inject(InjectType.ThreadID) private tid: number,
        @inject(InjectType.PostDao) private postDao: PostDao,
        @inject(InjectType.UserService) private userService: UserService,
    ) {
        this.postImagesDir = ScrapeDataSourceDirStruct.getPostImagesDir(this.scrapeDataPath, this.tid)
        this.postVideosDir = ScrapeDataSourceDirStruct.getPostVideosDir(this.scrapeDataPath, this.tid)
        this.postVoicesDir = ScrapeDataSourceDirStruct.getPostVoicesDir(this.scrapeDataPath, this.tid)
    }

    public getPosts(queryParams: RP.GetPostsQueryParams): PostsDTO {
        const { pn, rn, sort, filter, comment_rn, comment_sort } = queryParams
        const offset = (pn - 1) * rn
        const limit = rn

        let queryResult: DAO.AllQueryResult<Entity.Post>
        switch (filter) {
            case 0:
                queryResult = this.postDao.getPosts(offset, limit, sort)
                break
            case 1:
                queryResult = this.postDao.getPostsOfByThreadAuthor(offset, limit, sort)
                break
            case 2:
                queryResult = this.postDao.getPostsOfByOrRepliedByThreadAuthor(offset, limit, sort)
                break
            default:
                throw new Error('Invalid posts filter')
        }

        const postsVO = queryResult.results.map(post => {
            const user = this.userService.getUserInfo(post.user_id)!
            const contentFragments = this.__parseContentFragment(post.contents)

            const commentsQueryResult = this.postDao.getComments(post.id, 0, comment_rn, comment_sort)

            /**
             * NOTE 传入results.map(this.commentVOFactory.bind(this)) 需要绑定this
             * 因为commentVOFactory是普通函数，它的this指向函数的调用者。在运行时导致this无法指向PostService实例
             * 解决方法：
             * 1. 把commentVOFactory方法变为箭头函数
             * 2. 使用bind方法绑定this
             */
            const comments = post.reply_num ?
                commentsQueryResult.results.map(this.__commentVOFactory.bind(this))
                : []

            const commentPage = new Page(1, comment_rn, commentsQueryResult.totalCount)
            const commentDTO = new CommentsDTO(comments, commentPage)

            return new PostVO(
                post.id,
                contentFragments,
                post.floor,
                user,
                post.agree,
                post.disagree,
                post.create_time,
                post.is_thread_author,
                post.sign,
                post.reply_num,
                commentDTO,
            )
        })

        const page = new Page(pn, rn, queryResult.totalCount)
        return new PostsDTO(postsVO, page)
    }

    public getPost(id: number): PostVO | undefined {
        const post = this.postDao.getPost(id)
        if (!post) return

        const contentFragments = this.__parseContentFragment(post.contents)
        const user = this.userService.getUserInfo(post.user_id)!

        return new PostVO(
            post.id,
            contentFragments,
            post.floor,
            user,
            post.agree,
            post.disagree,
            post.create_time,
            post.is_thread_author,
            post.sign,
            post.reply_num,
            {} as CommentsDTO,
        )
    }

    public getComments(parentId: number, pn: number, rn: number, sort: CommentSortType): CommentsDTO {
        const offset = (pn - 1) * rn
        const queryResult = this.postDao.getComments(parentId, offset, rn, sort)

        // map 箭头函数this绑定问题 
        const commentsVo = queryResult.results.map(this.__commentVOFactory.bind(this))
        const page = new Page(pn, rn, queryResult.totalCount)
        return new CommentsDTO(commentsVo, page)
    }

    private __commentVOFactory(post: Entity.Post): CommentVO {
        const user = this.userService.getUserInfo(post.user_id)!
        const replyToUser = post.reply_to_id ? this.userService.getUserInfo(post.reply_to_id) : undefined
        const contentFragments = this.__parseContentFragment(post.contents)

        return new CommentVO(
            post.id,
            contentFragments,
            post.floor,
            user,
            post.agree,
            post.disagree,
            post.create_time,
            post.is_thread_author,
            post.parent_id,
            replyToUser,
        )
    }

    /**
     * 解析帖子内容，把图片，视频等静态文件的连接拼接完整。
     */
    private __parseContentFragment(contents: string): VO.ContentFragment[] {
        const contentFragments: Entity.ContentFragment[] = JSON.parse(contents)

        const parsedContents = contentFragments.map<VO.ContentFragment>(fragment => {
            switch (fragment.type) {
                case ContentFragmentType.IMAGE:
                    (fragment as VO.FragImage).src = 'file:///' + n_path.join(this.postImagesDir, (fragment as Entity.FragImage).filename);
                    delete (fragment as any).filename;
                    return fragment
                case ContentFragmentType.VIDEO:
                    (fragment as VO.FragVideo).src = 'file:///' + n_path.join(this.postVideosDir, (fragment as Entity.FragVideo).filename);
                    delete (fragment as any).filename;
                    (fragment as VO.FragVideo).cover_src = 'file:///' + n_path.join(this.postImagesDir, (fragment as Entity.FragVideo).cover_filename);
                    delete (fragment as any).cover_filename;
                    return fragment
                case ContentFragmentType.VOICE:
                    (fragment as VO.FragVoice).src = 'file:///' + n_path.join(this.postVoicesDir, (fragment as Entity.FragVoice).filename || '')
                    delete (fragment as any).filename
                    return fragment
                default:
                    return fragment
            }
        })

        return parsedContents
    }

    public searchPosts(): undefined {

        // TODO
        // 还有传入  ， post 的 pagesize， 和 comment的 pageszie 
        // 返回  ppn, floor, pid,  
        // cpn, cid,
    }
}


export default PostService;