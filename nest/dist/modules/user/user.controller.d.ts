import { FastifyReply, FastifyRequest } from 'fastify';
import { jwtPayloadDto } from '@/auth/dto/auth.interface';
import { CreateUserDto } from './dtos/users.interface';
import { UsersService } from './user.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserList(req: FastifyRequest & {
        user: jwtPayloadDto;
    }, res: FastifyReply): Promise<void>;
    getUserDetail(req: FastifyRequest, res: FastifyReply, userId: number): Promise<void>;
    createUser(res: FastifyReply, createUserDto: CreateUserDto): Promise<void>;
}
