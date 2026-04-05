import { Router } from "express";
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

export const commentsRouter = Router();

const validateParameterCommentId = createIdValidator(
    IdParamName.CommentId,
    CollectionNames.Comments,
);

const commentsHandler = container.get<CommentsHandler>(TYPES.UsersHandler);

// Return comment by id
commentsRouter.get(
    `/:${IdParamName.CommentId}`,
    validateParameterCommentId,
    //commentInputModelValidation,
    inputErrorManagementMiddleware,
    commentsHandler.getCommentById,
);

// Update existing comment by id with InputModel
commentsRouter.put(
    `/:${IdParamName.CommentId}`,
    accessTokenGuard,
    validateParameterCommentId,
    commentInputModelValidation,
    inputErrorManagementMiddleware,
    commentsHandler.updateCommentById,
);

// Delete comment specified by id
commentsRouter.delete(
    `/:${IdParamName.CommentId}`,
    accessTokenGuard,
    validateParameterCommentId,
    commentsHandler.deleteCommentById,
);

// Make like/unlike/dislike/undislike operation
commentsRouter.put(
    `/:${IdParamName.CommentId}/like-status`,
    accessTokenGuard,
    validateParameterCommentId,
    likeStatusInputModelValidation,
    inputErrorManagementMiddleware,
    commentsHandler.likeCommentById,
);