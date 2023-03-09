/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="cookie-parser" />
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';
interface VerifiedCallback {
    (error: Error | null, user?: Express.User | false, info?: Express.AuthInfo): void;
}
declare const ApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Express.Request, apiKey: string, done: VerifiedCallback): Promise<void>;
}
export {};
