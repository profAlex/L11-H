import { Schema, model, Model, HydratedDocument } from "mongoose";
import { CommentStorageModel } from "../routers/router-types/comment-storage-model";
import { CommentatorInfo } from "../routers/router-types/comment-commentator-info";
import { LikesInfoStorageModel, LikesInfoViewModel } from "../routers/router-types/comment-likes-info-view-model";
import { COMMENTS_COLLECTION_NAME } from "./mongo.db";

// export type CommentStorageModel = {
//     _id: ObjectId;
//     id: string;
//     relatedPostId: string;
//     content: string;
//     commentatorInfo: CommentatorInfo;
//     createdAt: Date;
//     likesInfo: LikesInfoViewModel;
// };
//
// export type CommentatorInfo = {
//     userId: string;
//     userLogin: string;
// };

const CommentatorInfoSchema = new Schema<CommentatorInfo>({
    userId: { type: String, required: true },
    userLogin: { type: String, required: true },
});

// export enum LikeStatus {
//     None = 'None',
//     Like = 'Like',
//     Dislike = 'Dislike'
// }
//
// export type LikesInfoViewModel = {
//     likesCount: number;
//     dislikesCount: number;
//     myStatus: LikeStatus;
// }

const LikesInfoStorageSchema = new Schema<LikesInfoStorageModel>({
    likesCount: { type: Number, required: true },
    dislikesCount: { type: Number, required: true },
});

const CommentSchema = new Schema<CommentStorageModel>(
    {
        _id: { type: Schema.Types.ObjectId },
        id: { type: String, required: true },
        relatedPostId: { type: String, required: true },
        content: { type: String, required: true },
        commentatorInfo: CommentatorInfoSchema,
        createdAt: { type: Date, required: true },
        likesInfo: LikesInfoStorageSchema,
    },
    {
        collection: COMMENTS_COLLECTION_NAME,
        timestamps: false,
        versionKey: false,
        id: false,
    },
);

type CommentModelType = Model<CommentStorageModel>;

export type CommentDocument = HydratedDocument<CommentStorageModel>;
export const CommentModel = model<CommentStorageModel, CommentModelType>(
    "CommentModel",
    CommentSchema,
);
