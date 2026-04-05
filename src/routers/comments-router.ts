import { Router, Request, Response } from "express";
import { IdParamName } from "./util-enums/id-names";
import { createIdValidator } from "./validation-middleware/id-verification-and-validation";
import { CollectionNames } from "../db/collection-names";
import { inputErrorManagementMiddleware } from "./validation-middleware/error-management-validation-middleware";
import { commentInputModelValidation } from "./validation-middleware/comment-input-model-validation";
import { accessTokenGuard } from "./guard-middleware/access-token-guard";
import { likeStatusInputModelValidation } from "./validation-middleware/comment-like-input-model-validation";
import { container } from "../composition-root/composition-root";
import { TYPES } from "../composition-root/ioc-types";
import { CommentsHandler } from "./router-handlers/comment-router-description";
import { RequestWithParams, RequestWithParamsAndBody } from "./request-types/request-types";
import { CommentInputModel } from "./router-types/comment-input-model";
import { LikeInputModel } from "./router-types/comments-like-input-model";

export const commentsRouter = Router();

const validateParameterCommentId = createIdValidator(
    IdParamName.CommentId,
    CollectionNames.Comments,
);

// Функция-помощник, чтобы не писать container.get в каждом методе,
// но при этом доставать хэндлер только в момент вызова (Lazy Load)
const getHandler = () => container.get<CommentsHandler>(TYPES.CommentsHandler);

// Return comment by id
commentsRouter.get(
    `/:${IdParamName.CommentId}`,
    validateParameterCommentId,
    inputErrorManagementMiddleware,
    (req:  RequestWithParams<{commentId: string}>, res: Response) => getHandler().getCommentById(req, res)
);

// Update existing comment by id with InputModel
commentsRouter.put(
    `/:${IdParamName.CommentId}`,
    accessTokenGuard,
    validateParameterCommentId,
    commentInputModelValidation,
    inputErrorManagementMiddleware,
    (req: RequestWithParamsAndBody<
        { [IdParamName.CommentId]: string },
        CommentInputModel
    >, res: Response) => getHandler().updateCommentById(req, res)
);

// Delete comment specified by id
commentsRouter.delete(
    `/:${IdParamName.CommentId}`,
    accessTokenGuard,
    validateParameterCommentId,
    (req: RequestWithParams<{ [IdParamName.CommentId]: string }>, res: Response) => getHandler().deleteCommentById(req, res)
);

// Make like/unlike/dislike/undislike operation
commentsRouter.put(
    `/:${IdParamName.CommentId}/like-status`,
    accessTokenGuard,
    validateParameterCommentId,
    likeStatusInputModelValidation,
    inputErrorManagementMiddleware,
    (req: RequestWithParamsAndBody<
        { [IdParamName.CommentId]: string },
        LikeInputModel
    >, res: Response) => getHandler().likeCommentById(req, res)
);