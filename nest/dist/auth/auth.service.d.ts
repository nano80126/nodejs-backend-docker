import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/user/user.service';
import { jwtPayloadDto } from './dto/auth.interface';
export declare class AuthService {
    private readonly configService;
    private readonly usersService;
    private readonly jwtService;
    constructor(configService: ConfigService, usersService: UsersService, jwtService: JwtService);
    validateApiKey(apiKey: string): Promise<true>;
    validateUser(account: string, password: string): Promise<{
        id: number;
        account: string;
        roles: any[];
    }>;
    createJwtToken(payload: jwtPayloadDto): Promise<string>;
    verifyJwtToken(token: string): Promise<any>;
    createRefreshToken(payload: {
        id: number;
    }): Promise<string>;
    refreshAccessToken(token: string): Promise<void>;
}
