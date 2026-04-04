import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";
import { CommentStorageModel } from "../../routers/router-types/comment-storage-model";
import { CommentModel } from "../../db/mongo.db";
import { CommentInputModel } from "../../routers/router-types/comment-input-model";
import { CustomResult } from "../../common/result-type/result-type";
import { HttpStatus } from "../../common/http-statuses/http-statuses";
import { CommentDocument } from "../../db/mongoose-comment-collection-model";
import { CommentViewModel } from "../../routers/router-types/comment-view-model";

@injectable()
export class CommentsCommandRepository {
    // async function findCommentByPrimaryKey(
    //     id: ObjectId,
    // ): Promise<CommentStorageModel | null> {
    //     return commentsCollection.findOne({ _id: id });
    // }

    async findCommentByPrimaryKey(id: string): Promise<CommentDocument | null> {
        return CommentModel.findById(id);
    }

    async findCommentByPrimaryKeyLean(id: string): Promise<CommentViewModel | null> {
        return CommentModel.findById(id).lean();
    }

    async updateCommentById(
        sentComment: CommentDocument
    ): Promise<CustomResult> {
        try {
            // Просто сохраняем. Если база не ответит или будет ошибка,
            // мы автоматически улетим в блок catch.
            await sentComment.save();

            // Если мы дошли до этой строки, значит сохранение прошло успешно.
            return {
                data: null,
                statusCode: HttpStatus.NoContent,
                statusDescription: "",
                errorsMessages: [
                    {
                        field: "",
                        message: ""
                    }
                ]
            };
        } catch (error) {
            // Все ошибки (база недоступна, ошибка валидации схемы и т.д.) обрабатываются здесь
            return {
                data: null,
                statusCode: HttpStatus.InternalServerError,
                statusDescription: `Mongoose save() error inside CommentsCommandRepository.updateCommentById: ${error instanceof Error ? error.message : "Unknown error"}`,
                errorsMessages: [
                    {
                        field: "sentComment.save()",
                        message: `Unknown error while trying to update comment via save()`
                    }
                ]
            };
        }
    }

    async deleteCommentById(sentId: string): Promise<CustomResult> {
        try {
            const result = await CommentModel.deleteOne({ _id: sentId as any });

            if (!result.acknowledged)
            {
                return {
                    data: null,
                    statusCode: HttpStatus.InternalServerError,
                    statusDescription: "Database failed to acknowledge deletion inside CommentsCommandRepository.deleteById",
                    errorsMessages: [{ field: "CommentsCommandRepository.deleteById", message: "Deletion not acknowledged" }]
                }
            }
            return {
                data: null,
                statusCode: HttpStatus.NoContent,
                statusDescription: "",
                errorsMessages: [
                    {
                        field: "",
                        message: ""
                    }
                ]
            };

        } catch (error) {
            return {
                data: null,
                statusCode: HttpStatus.InternalServerError,
                statusDescription: `Mongoose deleteOne() error inside CommentsCommandRepository.deleteById: ${error instanceof Error ? error.message : "Unknown error"}`,

                errorsMessages: [
                    {
                        field: "CommentsCommandRepository.deleteById", // это служебная и отладочная информация, к ней НЕ должен иметь доступ фронтенд, обрабатываем внутри периметра работы бэкэнда
                        message: `Unknown error while trying to delete comment`
                    }
                ]
            };
        }
    }
}
