import { BaseEntity } from 'typeorm';
import { User } from './users.entity';
export declare class RefreshToken extends BaseEntity {
    id: number;
    user: User;
    token: string;
    'expire_time': Date;
    'update_time': Date;
    'create_time': Date;
    'delete_time': Date;
}
