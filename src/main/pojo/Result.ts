class Result<T = any> {
    public constructor(
        public code: number,
        public msg: string,
        public data?: T,
    ) { }

    public static ok<T>(data?: T): Result {
        return new Result(0, 'ok', data)
    }

    public static error(msg: string): Result {
        return new Result(1, msg)
    }
}

export default Result;