/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="cookie-parser" />
import { Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Express.Request, payload: object, done: VerifiedCallback): Promise<void>;
}
export {};
