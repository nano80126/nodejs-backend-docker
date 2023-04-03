import { BaseEntity, Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from './users.entity';

@Entity()
export class RefreshToken extends BaseEntity {
	@PrimaryGeneratedColumn({ comment: 'PK' })
	id: number;

	@Column({ type: 'varchar', length: 255, comment: 'refresh token' })
	refresh_token: string;

	@OneToOne(() => Users, (user) => user.refresh_token)
	user: Users;
}
