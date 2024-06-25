
class CommentVO {
    public constructor(
        public id: number,
        public contents: VO.ContentFragment[],
        public floor: number,
        public user: VO.User,
        public agree: number,
        public disagree: number,
        public create_time: number,
        public is_thread_auhtor: boolean,
        public parent_id: number,
        public reply_to_user: VO.User | undefined,
    ) { }
}


export default CommentVO 