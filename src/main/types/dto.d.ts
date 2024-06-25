declare namespace DTO {
    type ThreadInfo = {
        scrape_info: VO.ScrapeInfo
        thread: VO.Thread
        forum: VO.Forum
    }

    type ThreadPreview = {
        thread: VO.Thread
        user: VO.User
        contents: VO.ContentFragment[]
    }

    type Posts = {
        posts: VO.Post[]
        page: Page
    }

    type Comments = {
        comments: VO.Comment[]
        page: Page
    }

    type User = VO.User
}