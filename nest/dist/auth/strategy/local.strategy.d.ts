/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="cookie-parser" />
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Express.Request, account: string, password: string, done: (error: Error | null, user?: Express.User | false, info?: Express.AuthInfo) => void): Promise<void>;
}
export {};
