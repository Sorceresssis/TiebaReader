import ResourcePath from "./resource_path"

class InitialValue {
    private static __deepCopy(obj: any) {
        return JSON.parse(JSON.stringify(obj))
    }

    public static getVueViewerOptions(): Viewer.Options {
        const defaultValue = {
            transition: false,
            toolbar: {
                zoomIn: 1,
                zoomOut: 1,
                oneToOne: 1,
                reset: 1,
                prev: 1,
                play: false,
                next: 1,
                rotateLeft: 1,
                rotateRight: 1,
                flipHorizontal: 1,
                flipVertical: 1,
            },
            filter(image: HTMLImageElement) {
                return image.classList.contains('content-frag-image')
            },
        } as Viewer.Options

        return defaultValue
    }


    public static getScrapeInfo(): VO.ScrapeInfo {
        const defaultValue: VO.ScrapeInfo = {
            main_thread: 0,
            scraper_version: '',
            create_time: 0
        }

        return InitialValue.__deepCopy(defaultValue)
    }

    public static getForum(): VO.Forum {
        const defaultValue: VO.Forum = {
            id: 0,
            name: '',
            category: '',
            subcategory: '',
            member_num: 0,
            post_num: 0,
            thread_num: 0,
            slogan: '',
            small_avatar: '',
            origin_avatar: '',
        }

        return InitialValue.__deepCopy(defaultValue)
    }

    public static getThread(): VO.Thread {
        const defaultValue: VO.Thread = {
            id: 0,
            title: '',
            forum_id: 0,
            forum_name: '',
            post_id: 0,
            user_id: 0,
            type: 0,
            is_share: false,
            is_help: false,
            vote_info: {
                title: '',
                is_multi: false,
                total_vote: 0,
                total_user: 0,
                options: []
            },
            share_origin: 0,
            view_num: 0,
            reply_num: 0,
            share_num: 0,
            agree: 0,
            disagree: 0,
            create_time: 0,
        }

        return InitialValue.__deepCopy(defaultValue)
    }

    public static getPage(): Page {
        const defaultValue: Page = {
            current_page: 1,
            page_size: 30,
            total_page: 1,
            total_count: 30,
            has_more: false,
        }

        return InitialValue.__deepCopy(defaultValue)
    }

    public static getUser(): VO.User {
        const defaultValue: VO.User = {
            id: 0,
            portrait: '',
            username: '',
            nickname: '',
            avatar: ResourcePath.USER_AVATAR_DEFAULT,
            glevel: 0,
            gender: 0,
            ip: '',
            is_vip: false,
            is_god: false,
            tieba_uid: 0,
            age: 0,
            sign: '',
            post_num: 0,
            agree_num: 0,
            fan_num: 0,
            follow_num: 0,
            forum_num: 0,

            level: 0,
            is_bawu: false,
            status: 0
        }

        return InitialValue.__deepCopy(defaultValue)
    }
}


export default InitialValue