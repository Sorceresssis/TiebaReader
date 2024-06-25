import CommentsDTO from "../dto/CommentsDTO"
import type CommentVO from "./CommentVO"

class PostVO {
    public constructor(
        public id: number,
        public contents: VO.ContentFragment[],
        public floor: number,
        public user: VO.User,
        public agree: number,
        public disagree: number,
        public create_time: number,
        public is_thread_auhtor: boolean,
        public sign: string,
        public reply_num: number,
        public comments: CommentsDTO,
    ) { }
}



export default PostVO