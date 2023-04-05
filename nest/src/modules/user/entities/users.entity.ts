import { BaseEntity, Column, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RefreshToken } from './refreshToken.entify';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn({ comment: 'PK' })
	id: number;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 20, comment: '帳號' })
	account: string;

	@Column({ type: 'varchar', length: 60, comment: '密碼' })
	password: string;

	@Column({ type: 'varchar', length: 20, comment: '遮蔽的密碼' })
	password_masked: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	'update_time': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'create_time': Date;

	@DeleteDateColumn({ type: 'timestamp', comment: '軟刪除時間' })
	'delete_time': Date;

	@OneToOne(() => RefreshToken, (token) => token.user)
	'refresh_token': RefreshToken;
}
