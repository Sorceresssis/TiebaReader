import 'reflect-metadata';
import { Container } from "inversify";
import InjectType from './inject_type';
import type ContentDB from '../db/content_db';
import PostDao from '../dao/PostDao';
import UserDao from '../dao/UserDao';
import ScrapeInfoService from '../services/ScrapeInfoService';
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import ThreadService from '../services/ThreadService';

const container = new Container()

// Scrape Data Source Deps
container.bind(InjectType.ScrapeDataPath).toConstantValue('')
container.bind(InjectType.ThreadID).toConstantValue(0)
container.bind(InjectType.ContentDB).toConstantValue(null)

container.bind(InjectType.PostDao).to(PostDao).inTransientScope()
container.bind(InjectType.UserDao).to(UserDao).inTransientScope()


container.bind(InjectType.ScrapeInfoService).to(ScrapeInfoService).inTransientScope()
container.bind(InjectType.ThreadService).to(ThreadService).inTransientScope()
container.bind(InjectType.PostService).to(PostService).inTransientScope()
container.bind(InjectType.UserService).to(UserService).inTransientScope()


export function rebindDataSourcesDeps(dataSources: string, tid?: number, contentDB?: ContentDB) {
    container.unbind(InjectType.ScrapeDataPath)
    container.bind(InjectType.ScrapeDataPath).toConstantValue(dataSources)

    if (!tid) return
    container.unbind(InjectType.ThreadID)
    container.bind(InjectType.ThreadID).toConstantValue(tid)

    if (!contentDB) return
    container.unbind(InjectType.ContentDB)
    container.bind(InjectType.ContentDB).toConstantValue(contentDB)
}


export default container