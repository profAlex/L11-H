

import { Router } from "express";
import { IdParamName } from "./util-enums/id-names";
import { createIdValidator } from "./validation-middleware/id-verification-and-validation";
import { CollectionNames } from "../db/collection-names";
import { inputErrorManagementMiddleware } from "./validation-middleware/error-management-validation-middleware";
import { commentInputModelValidation } from "./validation-middleware/comment-input-model-validation";
// import {
//     deleteCommentById,
//     getCommentById,
//     updateCommentById,
// } from "./router-handlers/comment-router-description";
import { accessTokenGuard } from "./guard-middleware/access-token-guard";
import { likeStatusInputModelValidation } from "./validation-middleware/comment-like-input-model-validation";

export const commentsRouter = Router();

const validateParameterCommentId = createIdValidator(
    IdParamName.CommentId,
    CollectionNames.Comments,
);

// Return comment by id
commentsRouter.get(
    `/:${IdParamName.CommentId}`,
    validateParameterCommentId,
    //commentInputModelValidation,
    inputErrorManagementMiddleware,
    getCommentById,
);

// Update existing comment by id with InputModel
commentsRouter.put(
    `/:${IdParamName.CommentId}`,
    accessTokenGuard,
    validateParameterCommentId,
    commentInputModelValidation,
    inputErrorManagementMiddleware,
    updateCommentById,
);

// Delete comment specified by id
commentsRouter.delete(
    `/:${IdParamName.CommentId}`,
    accessTokenGuard,
    validateParameterCommentId,
    deleteCommentById,
);

// Make like/unlike/dislike/undislike operation
commentsRouter.put(
    `/:${IdParamName.CommentId}/like-status`,
    accessTokenGuard,
    validateParameterCommentId,
    likeStatusInputModelValidation,
    inputErrorManagementMiddleware,
    likeCommentById,
    // commentsHandler.,
);