import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../composition-root/ioc-types";
import { CommentInputModel } from "../routers/router-types/comment-input-model";
import { CustomResult } from "../common/result-type/result-type";
import { CommentsCommandRepository } from "../repository-layers/command-repository-layer/comments-command-repository";
import { HttpStatus } from "../common/http-statuses/http-statuses";
import { CommentDocument } from "../db/mongoose-comment-collection-model";
import { CommentViewModel } from "../routers/router-types/comment-view-model";
import { LikeStatus } from "../routers/router-types/comment-like-storage-model";

@injectable()
export class CommentsCommandService {
    constructor(
        @inject(TYPES.CommentsCommandRepository)
        protected commentsCommandRepository: CommentsCommandRepository,
    ) {}

    async updateCommentById(
        sentCommentId: string,
        sentUserId: string,
        sentContent: CommentInputModel,
    ): Promise<CustomResult> {
        const comment: CommentDocument | null =
            await this.commentsCommandRepository.findCommentByPrimaryKey(
                sentCommentId,
            );

        // проверяем что коммент существует
        if (!comment) {
            return {
                data: null,
                statusCode: HttpStatus.InternalServerError,
                statusDescription: `Comment is not found by sent comment ID ${sentCommentId} inside dataCommandRepository.updateCommentById. Even though this exact ID passed existence check in middlewares previously.`,
                errorsMessages: [
                    {
                        field: "if (!comment) inside dataCommandRepository.updateCommentById", // это служебная и отладочная информация, к ней НЕ должен иметь доступ фронтенд, обрабатываем внутри периметра работы бэкэнда
                        message: `Internal Server Error`,
                    },
                ],
            };
        }

        // проверяем что коммент принадлежит юзеру, который пытается его исправить
        if (sentUserId !== comment.commentatorInfo.userId) {
            return {
                data: null,
                statusCode: HttpStatus.Forbidden,
                statusDescription: `User is forbidden to change another user’s comment`,
                errorsMessages: [
                    {
                        field: "if (sentUserId !== comment.commentatorInfo.userId) inside dataCommandRepository.updateCommentById", // это служебная и отладочная информация, к ней НЕ должен иметь доступ фронтенд, обрабатываем внутри периметра работы бэкэнда
                        message: `User is forbidden to change another user’s comment`,
                    },
                ],
            };
        }

        // обновляем данные
        comment.content = sentContent.content;

        // сохраняем данные через слой репозиторий (хотя можно было бы и в этом сле это делать)
        return await this.commentsCommandRepository.updateCommentById(comment);
    }

    async deleteCommentById(
        sentCommentId: string,
        sentUserId: string,
    ): Promise<CustomResult> {
        try {
            const comment: CommentViewModel | null =
                await this.commentsCommandRepository.findCommentByPrimaryKeyLean(
                    sentCommentId,
                );

            if (!comment) {
                return {
                    data: null,
                    statusCode: HttpStatus.InternalServerError,
                    statusDescription: `Comment is not found by sent comment ID ${sentCommentId} inside dataCommandRepository.deleteCommentById. Even though this exact ID passed existence check in middlewares previously.`,
                    errorsMessages: [
                        {
                            field: "if (!comment) inside dataCommandRepository.deleteCommentById", // это служебная и отладочная информация, к ней НЕ должен иметь доступ фронтенд, обрабатываем внутри периметра работы бэкэнда
                            message: `Internal Server Error`,
                        },
                    ],
                };
            }

            if (sentUserId !== comment.commentatorInfo.userId) {
                return {
                    data: null,
                    statusCode: HttpStatus.Forbidden,
                    statusDescription: `User is forbidden to delete another user’s comment`,
                    errorsMessages: [
                        {
                            field: "if (sentUserId !== comment.commentatorInfo.userId) inside dataCommandRepository.deleteCommentById", // это служебная и отладочная информация, к ней НЕ должен иметь доступ фронтенд, обрабатываем внутри периметра работы бэкэнда
                            message: `User is forbidden to delete another user’s comment`,
                        },
                    ],
                };
            }

            return await this.commentsCommandRepository.deleteCommentById(
                sentCommentId,
            );
        } catch (error) {
            return {
                data: null,
                statusCode: HttpStatus.InternalServerError,
                statusDescription: `Unknown error inside try-catch block inside CommentsCommandService.deleteCommentById: ${JSON.stringify(
                    error,
                )}`,
                errorsMessages: [
                    {
                        field: "CommentsCommandService.deleteCommentById", // это служебная и отладочная информация, к ней НЕ должен иметь доступ фронтенд, обрабатываем внутри периметра работы бэкэнда
                        message: `Unknown error inside try-catch block: ${JSON.stringify(error)}`,
                    },
                ],
            };
        }
    }

    async likeCommentById(
        sentCommentId: string,
        sentUserId: string,
        sentLike: LikeStatus,
    ):Promise<CustomResult>
    {
        извлечь информацию о том, лайкал ли пользователь коммент с указанным айди
        если не лайкал то применить то что передано в лайкстатусе
        если лайкал изменить информацию о статуслайке коммента, если по логике это допустимо
        добавить-изменить информацию в базе лайков
        изменить информацию в базе комментов

    }
}
