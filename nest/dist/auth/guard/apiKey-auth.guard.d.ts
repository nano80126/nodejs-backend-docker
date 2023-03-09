/// <reference types="passport" />
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
declare const ApiKeyAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class ApiKeyAuthGuard extends ApiKeyAuthGuard_base {
    private reflector;
    private readonly logger;
    constructor(reflector: Reflector);
    handleRequest<TUser = any>(err: Error, user: any, info: Error | Express.AuthInfo, context: ExecutionContext, status?: any): TUser;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
