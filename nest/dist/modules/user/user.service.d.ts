import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from './entities/refreshToken.entify';
import { User } from './entities/users.entity';
import { RedisService } from '../redis.service';
export declare class UsersService {
    private userRepository;
    private refreshTokenRepository;
    private readonly redisService;
    private dataSource;
    constructor(userRepository: Repository<User>, refreshTokenRepository: Repository<RefreshToken>, redisService: RedisService, dataSource: DataSource);
    checkAccountExist(account: string): Promise<boolean>;
    createUser(account: string, password: string): Promise<RefreshToken>;
    updateUser(id: number): Promise<void>;
    findOneUser(account: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
    removeUser(user_id: number): Promise<User>;
    updateRefreshToken(userId: number, newToken: string, expireTime: Date): Promise<RefreshToken>;
}
