import { Schema, model, Model, HydratedDocument } from "mongoose";
import { CommentStorageModel } from "../routers/router-types/comment-storage-model";
import { CommentatorInfo } from "../routers/router-types/comment-commentator-info";
import {
    LikesInfoStorageModel,
    LikesInfoViewModel,
} from "../routers/router-types/comment-likes-info-view-model";
import { COMMENTS_COLLECTION_NAME } from "./mongo.db";
import { Document } from "mongodb";
import { LikeStatus } from "../routers/router-types/comment-like-storage-model";

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
    likesCount: { type: Number, required: true, default: 0, min: 0 },
    dislikesCount: { type: Number, required: true, default: 0, min: 0 },
    myStatus: {
        type: String,
        enum: Object.values(LikeStatus), // [ 'None', 'Like', 'Dislike' ]
        default: LikeStatus.None,
        required: true
    }
});

const CommentSchema = new Schema<CommentStorageModel>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        id: {
            type: String,
            required: true,
            default: function (this: CommentStorageModel & Document) {
                return this._id.toString();
            },
        },
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
        autoIndex: false,
    },
);

type CommentModelType = Model<CommentStorageModel>;

export type CommentDocument = HydratedDocument<CommentStorageModel>;
export const CommentModel = model<CommentStorageModel, CommentModelType>(
    "CommentModel",
    CommentSchema,
);
