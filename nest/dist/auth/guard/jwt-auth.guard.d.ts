/// <reference types="passport" />
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly reflector;
    private readonly authService;
    private readonly logger;
    constructor(reflector: Reflector, authService: AuthService);
    handleRequest<TUser = any>(err: Error, user: any, info: Error | Express.AuthInfo, context: ExecutionContext, status?: any): TUser;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
