import n_path from "node:path"
import { injectable, inject } from "inversify";
import InjectType from "../container/inject_type";
import ScrapeDataSourceDirStruct from "../config/scrapeDataSourceDirStruct";
import ResourcePath from "../config/resource_path";
import type UserDao from "../dao/UserDao";

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
        const user: DTO.User = this.userDao.getUserById(id) as any
        if (user) user.avatar = user.avatar ?
            'file:///' + n_path.join(this.userAvatarDir, user.avatar)
            : ResourcePath.USER_AVATAR_DEFAULT
        return user
    }
}

export default UserService;
