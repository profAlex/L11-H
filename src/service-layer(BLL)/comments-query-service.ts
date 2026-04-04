import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../composition-root/ioc-types";
import { CommentViewModel } from "../routers/router-types/comment-view-model";
import { CommentsQueryRepository } from "../repository-layers/query-repository-layer/comments-query-repository";

@injectable()
export class CommentsQueryService {

    constructor(@inject(TYPES.CommentsQueryRepository) protected commentsQueryRepository:CommentsQueryRepository) {
    }

    async findSingleComment(sentCommentId: string): Promise<CommentViewModel | undefined> {

        const foundComment = await this.commentsQueryRepository.findSingleComment(sentCommentId);;

        if(!foundComment) {
            return undefined;
        }

        if(здесь вызов функции)
        // TODO - здесь нужен метод commentsQueryService по поиску в базе лайков записи о том
        // TODO был ли от данного пользователя лайк или дизлайк
        // TODO и если был то перезаписать поле myStatus


        return foundComment;

    }

}