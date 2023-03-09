/// <reference types="passport" />
import { ExecutionContext } from '@nestjs/common';
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    private readonly logger;
    constructor();
    handleRequest<TUser = any>(err: Error, user: any, info: Error | Express.AuthInfo, context: ExecutionContext, status?: any): TUser;
}
export {};
