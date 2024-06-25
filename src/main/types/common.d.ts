interface Result<T> {
    code: number
    msg: string
    data: T
}

interface Page {
    current_page: number
    page_size: number
    total_page: number
    total_count: number
    has_more: boolean
}


namespace DAO {
    interface AllQueryResult<T> {
        results: T[];
        totalCount: number;
    }
}


