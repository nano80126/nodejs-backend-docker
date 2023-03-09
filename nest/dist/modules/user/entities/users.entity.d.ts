import { BaseEntity } from 'typeorm';
import { RefreshToken } from './refreshToken.entify';
export declare class User extends BaseEntity {
    id: number;
    account: string;
    password: string;
    password_masked: string;
    'update_time': Date;
    'create_time': Date;
    'delete_time': Date;
    'refresh_token': RefreshToken;
}
