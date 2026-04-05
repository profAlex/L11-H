import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./ioc-types";

import { AuthHandler } from "../routers/router-handlers/auth-router-description";
import { SessionsCommandRepository } from "../repository-layers/command-repository-layer/sessions-command-repository";
import { UsersQueryRepository } from "../repository-layers/query-repository-layer/users-query-repository";
import { AuthCommandService } from "../service-layer(BLL)/auth-command-service";
import { BcryptService } from "../adapters/authentication/bcrypt-service";
import { UsersHandler } from "../routers/router-handlers/user-router-description";
import { UsersCommandRepository } from "../repository-layers/command-repository-layer/users-command-repository";
import { UsersCommandService } from "../service-layer(BLL)/users-command-service";
import { UsersQueryService } from "../service-layer(BLL)/users-query-service";
import { SecurityDevicesHandler } from "../routers/router-handlers/security-devices-router-description";
import { SecurityDevicesCommandService } from "../service-layer(BLL)/security-devices-command-service";
import { RefreshTokenGuard } from "../routers/guard-middleware/refresh-token-guard";
import { CommentsHandler } from "../routers/router-handlers/comment-router-description";
import { CommentsQueryService } from "../service-layer(BLL)/comments-query-service";
import { CommentsQueryRepository } from "../repository-layers/query-repository-layer/comments-query-repository";
import { LikesQueryRepository } from "../repository-layers/query-repository-layer/likes-query-repository";
import { CommentsCommandService } from "../service-layer(BLL)/comments-command-service";
import { CommentsCommandRepository } from "../repository-layers/command-repository-layer/comments-command-repository";
import { LikesCommandRepository } from "../repository-layers/command-repository-layer/likes-command-repository";

// export const authService = new AuthCommandService(
//     new UsersQueryRepository(),
//     new SessionsCommandRepository(),
//     new BcryptService(),
// );
//
// export const bcryptService = new BcryptService();
//
// export const sessionsCommandRepository = new SessionsCommandRepository();
// export const usersQueryRepository = new UsersQueryRepository();
// export const usersCommandRepository = new UsersCommandRepository(bcryptService);
//
// export const authService = new AuthCommandService(
//     usersCommandRepository,
//     usersQueryRepository,
//     sessionsCommandRepository,
//     bcryptService
// );
//
// export const usersCommandService = new UsersCommandService(usersCommandRepository);
// export const usersQueryService = new UsersQueryService(usersQueryRepository);
//
// export const securityDevicesCommandService = new SecurityDevicesCommandService(sessionsCommandRepository);
//
// export const refreshTokenGuardInstance = new RefreshTokenGuard(sessionsCommandRepository);
//
// export const usersHandler = new UsersHandler(usersCommandService, usersQueryService);
// export const securityDevicesHandler = new SecurityDevicesHandler(securityDevicesCommandService);
// export const authHandler = new AuthHandler(authService);


const container = new Container();

// middleware
container.bind(TYPES.RefreshTokenGuard).to(RefreshTokenGuard).inSingletonScope();

// хендлеры
container.bind(TYPES.UsersHandler).to(UsersHandler).inSingletonScope();
container.bind(TYPES.SecurityDevicesHandler).to(SecurityDevicesHandler).inSingletonScope();
container.bind(TYPES.AuthHandler).to(AuthHandler).inSingletonScope();
container.bind(TYPES.CommentsHandler).to(CommentsHandler).inSingletonScope();

// сервисы
container.bind(TYPES.BcryptService).to(BcryptService).inSingletonScope();
container.bind(TYPES.AuthCommandService).to(AuthCommandService).inSingletonScope();
container.bind(TYPES.UsersCommandService).to(UsersCommandService).inSingletonScope();
container.bind(TYPES.UsersQueryService).to(UsersQueryService).inSingletonScope();
container.bind(TYPES.SecurityDevicesCommandService).to(SecurityDevicesCommandService).inSingletonScope();
container.bind(TYPES.CommentsQueryService).to(CommentsQueryService).inSingletonScope();
container.bind(TYPES.CommentsCommandService).to(CommentsCommandService).inSingletonScope();

// для репозиториев
container.bind(TYPES.SessionsCommandRepository).to(SessionsCommandRepository).inSingletonScope();
container.bind(TYPES.UsersQueryRepository).to(UsersQueryRepository).inSingletonScope();
container.bind(TYPES.UsersCommandRepository).to(UsersCommandRepository).inSingletonScope();
container.bind(TYPES.CommentsQueryRepository).to(CommentsQueryRepository).inSingletonScope();
container.bind(TYPES.CommentsCommandRepository).to(CommentsCommandRepository).inSingletonScope();
container.bind(TYPES.LikesQueryRepository).to(LikesQueryRepository).inSingletonScope();
container.bind(TYPES.LikesCommandRepository).to(LikesCommandRepository).inSingletonScope();


export { container };