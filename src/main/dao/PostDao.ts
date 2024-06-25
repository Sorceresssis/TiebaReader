import { injectable, inject } from "inversify";
import InjectType from "../container/inject_type";
import type ContentDB from "../db/content_db";

export const enum PostSortType {
    TIME_ASC,
    TIME_DESC,
    AGREE,
    REPLY,
}

export const enum CommentSortType {
    TIME_ASC,
    AGREE,
}


@injectable()
class PostDao {
    public constructor(
        @inject(InjectType.ContentDB) private db: ContentDB
    ) { }

    public getPost(id: number): Entity.Post | undefined {
        const sql = 'SELECT id, contents, floor, user_id, agree, disagree, create_time, is_thread_author, sign, reply_num, parent_id, reply_to_id FROM post WHERE id = ?;'
        return this.db.prepare<[number], Entity.Post>(sql).get(id)
    }

    public getPosts(
        offset: number,
        limit: number,
        sort: PostSortType = PostSortType.TIME_ASC,
        includeTotal: boolean = true
    ): DAO.AllQueryResult<Entity.Post> {
        const sqlfrags = []
        sqlfrags.push('SELECT id, contents, floor, user_id, agree, disagree, create_time, is_thread_author, sign, reply_num, parent_id, reply_to_id FROM post WHERE parent_id = 0')
        sqlfrags.push('ORDER BY')
        switch (sort) {
            case PostSortType.TIME_ASC:
                sqlfrags.push('floor ASC')
                break
            case PostSortType.TIME_DESC:
                sqlfrags.push('floor DESC')
                break
            case PostSortType.AGREE:
                sqlfrags.push('agree DESC, floor ASC')
                break
            case PostSortType.REPLY:
                sqlfrags.push('reply_num DESC, floor ASC')
        }
        sqlfrags.push('LIMIT ?, ?;')

        const prepare = this.db.prepare<[number, number], Entity.Post>(sqlfrags.join(' '))
        const results = prepare.all(offset, limit)

        const totalCount = includeTotal ?
            this.db.prepare<[], number>('SELECT COUNT(id) FROM post WHERE parent_id = 0;').pluck().get() || 0
            : 0

        return { results, totalCount }
    }

    /**
     * 获取楼主的帖子, Of用于区分通过xx来获取数据的By。
     */
    public getPostsOfByThreadAuthor(
        offset: number,
        limit: number,
        sort: PostSortType = PostSortType.TIME_ASC,
        includeTotal: boolean = true
    ): DAO.AllQueryResult<Entity.Post> {
        const sqlfrags = []
        sqlfrags.push('SELECT id, contents, floor, user_id, agree, disagree, create_time, is_thread_author, sign, reply_num, parent_id, reply_to_id FROM post WHERE parent_id = 0 AND is_thread_author')
        sqlfrags.push('ORDER BY')
        switch (sort) {
            case PostSortType.TIME_ASC:
                sqlfrags.push('floor ASC')
                break
            case PostSortType.TIME_DESC:
                sqlfrags.push('floor DESC')
                break
            case PostSortType.AGREE:
                sqlfrags.push('agree DESC, floor ASC')
                break
            case PostSortType.REPLY:
                sqlfrags.push('reply_num DESC, floor ASC')
        }
        sqlfrags.push('LIMIT ?, ?;')
        const prepare = this.db.prepare<[number, number], Entity.Post>(sqlfrags.join(' '))
        const results = prepare.all(offset, limit)

        const totalCount = includeTotal ?
            this.db.prepare<[], number>('SELECT COUNT(id) FROM post WHERE parent_id = 0 AND is_thread_author;').pluck().get() || 0
            : 0
        return { results, totalCount }
    }

    /**
     * 获取楼主的帖子或者楼主回复过的帖子
     * getPosts Of ByOrRepliedBy ThreadAuthor
     */
    public getPostsOfByOrRepliedByThreadAuthor(
        offset: number,
        limit: number,
        sort: PostSortType = PostSortType.TIME_ASC,
        includeTotal: boolean = true
    ): DAO.AllQueryResult<Entity.Post> {
        const sqlfrags = []
        sqlfrags.push(`
            SELECT p1.id, p1.contents, p1.floor, p1.user_id, p1.agree, p1.disagree, p1.create_time, p1.is_thread_author, p1.sign, p1.reply_num, p1.parent_id, p1.reply_to_id
            FROM post p1
            LEFT JOIN post p2 ON p1.id = p2.parent_id
            WHERE p1.parent_id = 0 AND (p1.is_thread_author OR p2.is_thread_author)
            GROUP BY p1.floor`
        )
        sqlfrags.push('ORDER BY')
        switch (sort) {
            case PostSortType.TIME_ASC:
                sqlfrags.push('p1.floor ASC')
                break
            case PostSortType.TIME_DESC:
                sqlfrags.push('p1.floor DESC')
                break
            case PostSortType.AGREE:
                sqlfrags.push('p1.agree DESC, p1.floor ASC')
                break
            case PostSortType.REPLY:
                sqlfrags.push('p1.reply_num DESC, p1.floor ASC')
        }
        sqlfrags.push('LIMIT ?, ?;')
        const prepare = this.db.prepare<[number, number], Entity.Post>(sqlfrags.join(' '))
        const results = prepare.all(offset, limit)

        const totalCount = includeTotal ?
            this.db.prepare<[], number>('SELECT COUNT(DISTINCT p1.id) FROM post p1 LEFT JOIN post p2 ON p1.id = p2.parent_id WHERE p1.parent_id = 0 AND (p1.is_thread_author OR p2.is_thread_author);').pluck().get() || 0
            : 0
        return { results, totalCount }
    }

    public getComments(
        parentId: number,
        offset: number,
        limit: number,
        sort: CommentSortType = CommentSortType.TIME_ASC,
        includeTotal: boolean = true
    ): DAO.AllQueryResult<Entity.Post> {
        const sqlfrags = []
        sqlfrags.push('SELECT id, contents, floor, user_id, agree, disagree, create_time, is_thread_author, sign, reply_num, parent_id, reply_to_id FROM post WHERE parent_id = ? ORDER BY')

        switch (sort) {
            case CommentSortType.TIME_ASC:
                sqlfrags.push('create_time ASC')
                break
            case CommentSortType.AGREE:
                sqlfrags.push('agree DESC, create_time ASC')
                break
            default:
                throw new Error('Invalid sort type')
        }
        sqlfrags.push('LIMIT ?, ?;')
        const prepare = this.db.prepare<[number, number, number], Entity.Post>(sqlfrags.join(' '))

        const results = prepare.all(parentId, offset, limit)
        const totalCount = includeTotal ?
            this.db.prepare<[number], number>('SELECT COUNT(id) FROM post WHERE parent_id = ?').pluck().get(parentId) || 0
            : 0
        return {
            results,
            totalCount
        }
    }
}

export default PostDao;