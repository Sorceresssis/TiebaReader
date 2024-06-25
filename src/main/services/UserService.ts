import n_path from "node:path"
import { injectable, inject } from "inversify";
import InjectType from "../container/inject_type";
import type UserDao from "../dao/UserDao";
import ScrapeDataSourceDirStruct from "../config/scrapeDataSourceDirStruct";

@injectable()
class UserService {
    private readonly userAvatarDir: string

    public constructor(
        @inject(InjectType.ScrapeDataPath) private scrapeDataPath: string,
        @inject(InjectType.ThreadID) private tid: number,
        @inject(InjectType.UserDao) private userDao: UserDao,
    ) {
        this.userAvatarDir = ScrapeDataSourceDirStruct.getUserAvatarDir(this.scrapeDataPath, this.tid)
    }


    public getUserInfo(id: number): DTO.User | undefined {
        const user = this.userDao.getUserById(id)
        if (user) user.avatar = 'file:///' + n_path.join(this.userAvatarDir, user.avatar)
        return user
    }
}

export default UserService;
