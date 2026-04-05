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

// 1. Экспортируем функцию-фабрику вместо готового объекта router
export const getCommentsRouter = (commentsHandler: CommentsHandler) => {
    const commentsRouter = Router();

    const validateParameterCommentId = createIdValidator(
        IdParamName.CommentId,
        CollectionNames.Comments,
    );

    // Return comment by id
    commentsRouter.get(
        `/:${IdParamName.CommentId}`,
        validateParameterCommentId,
        inputErrorManagementMiddleware,
        commentsHandler.getCommentById,
    );

    // Update existing comment by id
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

    return commentsRouter;
};

// старая рабочая версия
// export const commentsRouter = Router();
//
// const validateParameterCommentId = createIdValidator(
//     IdParamName.CommentId,
//     CollectionNames.Comments,
// );
//
// const commentsHandler = container.get<CommentsHandler>(TYPES.UsersHandler);
//
// // Return comment by id
// commentsRouter.get(
//     `/:${IdParamName.CommentId}`,
//     validateParameterCommentId,
//     //commentInputModelValidation,
//     inputErrorManagementMiddleware,
//     commentsHandler.getCommentById,
// );
//
// // Update existing comment by id with InputModel
// commentsRouter.put(
//     `/:${IdParamName.CommentId}`,
//     accessTokenGuard,
//     validateParameterCommentId,
//     commentInputModelValidation,
//     inputErrorManagementMiddleware,
//     commentsHandler.updateCommentById,
// );
//
// // Delete comment specified by id
// commentsRouter.delete(
//     `/:${IdParamName.CommentId}`,
//     accessTokenGuard,
//     validateParameterCommentId,
//     commentsHandler.deleteCommentById,
// );
//
// // Make like/unlike/dislike/undislike operation
// commentsRouter.put(
//     `/:${IdParamName.CommentId}/like-status`,
//     accessTokenGuard,
//     validateParameterCommentId,
//     likeStatusInputModelValidation,
//     inputErrorManagementMiddleware,
//     commentsHandler.likeCommentById,
// );

// версия с дурацкими стрелочными функциями, которые не подтягивают типы req,res
// export const commentsRouter = Router();
//
// const validateParameterCommentId = createIdValidator(
//     IdParamName.CommentId,
//     CollectionNames.Comments,
// );
//
// // Функция-помощник, чтобы не писать container.get в каждом методе,
// // но при этом доставать хэндлер только в момент вызова (Lazy Load)
// const getHandler = () => container.get<CommentsHandler>(TYPES.CommentsHandler);
//
// // Return comment by id
// commentsRouter.get(
//     `/:${IdParamName.CommentId}`,
//     validateParameterCommentId,
//     inputErrorManagementMiddleware,
//     (req, res) => getHandler().getCommentById(req, res)
// );
//
// // Update existing comment by id with InputModel
// commentsRouter.put(
//     `/:${IdParamName.CommentId}`,
//     accessTokenGuard,
//     validateParameterCommentId,
//     commentInputModelValidation,
//     inputErrorManagementMiddleware,
//     (req: Request, res: Response) => getHandler().updateCommentById(req, res)
// );
//
// // Delete comment specified by id
// commentsRouter.delete(
//     `/:${IdParamName.CommentId}`,
//     accessTokenGuard,
//     validateParameterCommentId,
//     (req: Request, res: Response) => getHandler().deleteCommentById(req, res)
// );
//
// // Make like/unlike/dislike/undislike operation
// commentsRouter.put(
//     `/:${IdParamName.CommentId}/like-status`,
//     accessTokenGuard,
//     validateParameterCommentId,
//     likeStatusInputModelValidation,
//     inputErrorManagementMiddleware,
//     (req: Request, res: Response) => getHandler().likeCommentById(req, res)
// );