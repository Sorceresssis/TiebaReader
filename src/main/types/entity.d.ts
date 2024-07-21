declare namespace Entity {
    interface ScrapeInfo {
        main_thread: number
        scraper_version: string
        create_time: number
    }

    interface Forum {
        id: number
        name: string
        category: string
        subcategory: string
        member_num: number
        post_num: number
        thread_num: number
        slogan: string
        small_avatar: string
        origin_avatar: string
    }

    interface ThreadVoteOption {
        text: string
        vote_num: number
    }

    interface ThreadVoteInfo {
        title: string
        is_multi: boolean
        total_vote: number
        total_user: number
        options: Entity.ThreadVoteOption[]
    }

    interface Thread {
        id: number
        title: string
        forum_id: number
        forum_name: string
        post_id: number
        user_id: number
        type: number
        is_share: boolean
        is_help: boolean
        vote_info: Entity.ThreadVoteInfo
        share_origin: number
        view_num: number
        reply_num: number
        share_num: number
        agree: number
        disagree: number
        create_time: number
    }

    interface Post {
        id: number
        contents: string
        floor: number       // 楼和楼中楼一样
        user_id: number
        agree: number
        disagree: number
        create_time: number
        is_thread_author: boolean
        sign: string        // 小尾巴，post独有
        reply_num: number   // 楼独有，冗余字段，不需要join
        parent_id: number   // 楼中楼独有, 区分普通楼和楼中的唯一标识
        reply_to_id: number // 楼中楼独有, 是user_id不是pid. 所以无法回溯出很好的对话链路。
    }

    interface ContentFragment {
        type: number
    }

    interface FragScrapeError extends ContentFragment {
        error_frag_type: int
        error_frag_name: string
    }

    interface FragText extends ContentFragment {
        text: string
    }

    interface FragEmoji extends ContentFragment {
        id: string
        desc: string
    }

    interface FragImage extends ContentFragment {
        filename: string
        tb_origin_src: string
        origin_size: number   // 通常是0
        show_width: number
        show_height: number
        hash: string
    }

    interface FragAt extends ContentFragment {
        text: string
        user_id: number
    }

    interface FragLink extends ContentFragment {
        text: string
        title: string
        raw_url: string
    }

    interface FragTiebaPlus extends ContentFragment {
        text: string
        url: string
    }

    interface FragVideo extends ContentFragment {
        filename: string
        cover_filename: string
        duration: number
        width: number
        height: number
        view_num: number

        tb_origin_src: string
        tb_origin_cover_src: string
    }

    interface FragVoice extends ContentFragment {
        filename: string
        md5: string
        duration: number
        tb_origin_src: string
    }

    interface User {
        id: number
        portrait: string
        username: string | null
        nickname: string
        tieba_uid: number | null

        avatar: string | null
        glevel: number
        gender: number  // 0 unknown, 1 male, 2 female
        ip: string
        is_vip: boolean
        is_god: boolean
        age: number
        sign: string
        post_num: number
        agree_num: number
        fan_num: number
        follow_num: number
        forum_num: number

        level: number
        is_bawu: boolean
        status: number // 0 正常，1 注销
    }
}