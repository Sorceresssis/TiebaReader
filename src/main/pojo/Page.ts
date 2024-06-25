class Page {
    public current_page: number
    public page_size: number
    public total_page: number
    public total_count: number
    public has_more: boolean


    public constructor(current_page: number, page_size: number, total_count: number) {
        this.current_page = current_page
        this.page_size = page_size
        this.total_page = Math.ceil(total_count / page_size)
        this.total_count = total_count
        this.has_more = this.current_page < this.total_page
    }
}


export default Page;