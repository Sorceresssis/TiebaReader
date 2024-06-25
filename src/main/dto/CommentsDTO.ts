import CommentVO from "../vo/CommentVO";
import Page from "../pojo/Page";

class CommentsDTO {
    public constructor(
        public comments: CommentVO[],
        public page: Page,
    ) { }
}


export default CommentsDTO