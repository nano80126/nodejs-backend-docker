import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RefreshToken } from './refreshToken.entify';

@Entity()
export class Users extends BaseEntity {
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
	'insert_time': Date;

	@OneToOne(() => RefreshToken, { cascade: true })
	@JoinColumn()
	'refresh_token': RefreshToken;
}
