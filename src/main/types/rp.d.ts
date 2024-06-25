declare namespace RP {
    interface ThreadSource {
        path: string,
        tid: number
    }

    interface GetPostsQueryParams {
        pn: number
        rn: number
        sort: number // 0:TIME_ASC, TIME_DESC, AGREE, REPLY
        /**
         * 过滤条件
         * 0 : 不过滤
         * 1 : 作者是楼主的post(only_thread_author_post)
         * 2 : 楼主回复过或者是楼主写的帖子
         */
        filter: number
        comment_rn: number // 评论页每页显示数量
        comment_sort: number // 0 time, 1 agree
    }

    interface GetCommentsQueryParams {
        pid: number
        pn: number
        rn: number
        sort: number // 0:TIME_ASC, 1:AGREE,
    }
}