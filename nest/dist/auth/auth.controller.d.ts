import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { validateUserResDto } from './dto/auth.interface';
interface FastifyRequestWithUserAuth extends FastifyRequest {
    user: validateUserResDto & {
        apiKeyIsValid: boolean;
    };
    authInfo: {
        message: string;
    };
}
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(req: FastifyRequestWithUserAuth, res: FastifyReply): Promise<void>;
    refresh(req: FastifyRequest, res: FastifyReply): Promise<void>;
}
export {};
