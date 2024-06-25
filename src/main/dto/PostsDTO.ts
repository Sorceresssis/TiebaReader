import PostVO from "../vo/PostVO";
import type Page from "../pojo/Page";


class PostsDTO {
    public constructor(
        public posts: PostVO[],
        public page: Page,
    ) { }
}


export default PostsDTO;