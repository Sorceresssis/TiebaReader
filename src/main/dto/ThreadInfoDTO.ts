class ThreadInfoDTO {
    public constructor(
        public scrape_info: VO.ScrapeInfo,
        public thread: VO.Thread,
        public forum: VO.Forum
    ) { }
}


export default ThreadInfoDTO;