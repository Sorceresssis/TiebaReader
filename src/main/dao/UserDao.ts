import { injectable, inject } from "inversify";
import InjectType from "../container/inject_type";
import type ContentDB from "../db/content_db";


@injectable()
class UserDao {
    public constructor(
        @inject(InjectType.ContentDB) private db: ContentDB
    ) { }

    public getUserById(id: number): Entity.User | undefined {
        const prepare = this.db.prepare<[number], Entity.User>("SELECT id, portrait, username, nickname, avatar, glevel, gender, ip, is_vip, is_god, tieba_uid, age, sign, post_num, agree_num, fan_num, follow_num, forum_num, level, is_bawu, status FROM user WHERE id = ?;")
        return prepare.get(id)
    }
}


export default UserDao;