declare namespace VO {
    type ScrapeInfo = Entity.ScrapeInfo

    type Forum = Entity.Forum

    type Thread = Entity.Thread

    interface ContentFragment {
        type: number
    }

    interface FragScrapeError extends VO.ContentFragment {
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
        src: string

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
        src: string,
        cover_src: string

        duration: number
        width: number
        height: number
        view_num: number

        tb_origin_src: string
        tb_origin_cover_src: string
    }

    interface FragVoice extends ContentFragment {
        src: string
        md5: string
        duration: number
        tb_origin_src: string
    }

    type Post = {
        id: number
        contents: ContentFragment[]
        floor: number
        user: VO.User
        agree: number
        disagree: number
        create_time: number
        is_thread_auhtor: boolean
        sign: string        // 独有
        reply_num: number   // 独有
        comments: DTO.Comments
    }

    type Comment = {
        id: number
        contents: ContentFragment[]
        floor: number
        user: VO.User
        agree: number
        disagree: number
        create_time: number
        is_thread_auhtor: boolean
        parent_id: number   // 独有 
        reply_to_user: VO.User // 独有
    }

    type User = Omit<Entity.User, 'avatar'> & { avatar: string | undefined };
}