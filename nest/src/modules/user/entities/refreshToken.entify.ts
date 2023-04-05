import { timestamp } from 'rxjs';
import { BaseEntity, Column, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './users.entity';

@Entity()
export class RefreshToken extends BaseEntity {
	@PrimaryGeneratedColumn({ comment: 'PK' })
	id: number;

	@Index('idx_user')
	@OneToOne(() => User, (user) => user.refresh_token)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ type: 'varchar', default: '', length: 255, comment: 'refresh token' })
	token: string;

	@Column({ type: 'timestamp', default: null })
	'expire_time': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'update_time': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'create_time': Date;

	@DeleteDateColumn({ type: 'timestamp', comment: '軟刪除時間，與User同步' })
	'delete_time': Date;
}
