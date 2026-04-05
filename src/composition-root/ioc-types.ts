export const TYPES = {
    // Services
    BcryptService: Symbol.for("BcryptService"),
    AuthCommandService: Symbol.for("AuthCommandService"),
    UsersCommandService: Symbol.for("UsersCommandService"),
    UsersQueryService: Symbol.for("UsersQueryService"),
    SecurityDevicesCommandService: Symbol.for("SecurityDevicesCommandService"),
    CommentsQueryService: Symbol.for("CommentsQueryService"),
    CommentsCommandService: Symbol.for("CommentsCommandService"),

    // Repositories
    SessionsCommandRepository: Symbol.for("SessionsCommandRepository"),
    UsersQueryRepository: Symbol.for("UsersQueryRepository"),
    UsersCommandRepository: Symbol.for("UsersCommandRepository"),
    CommentsQueryRepository: Symbol.for("CommentsQueryRepository"),
    CommentsCommandRepository: Symbol.for("CommentsCommandRepository"),
    LikesCommandRepository: Symbol.for("LikesCommandRepository"),
    LikesQueryRepository: Symbol.for("LikesQueryRepository"),

    // Handlers (Controller logic)
    UsersHandler: Symbol.for("UsersHandler"),
    SecurityDevicesHandler: Symbol.for("SecurityDevicesHandler"),
    AuthHandler: Symbol.for("AuthHandler"),
    CommentsHandler: Symbol.for("CommentsHandler"),

    // Guards / Middlewares
    RefreshTokenGuard: Symbol.for("RefreshTokenGuard"),
};
