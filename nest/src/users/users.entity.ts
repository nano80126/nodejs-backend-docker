import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Users {
	@PrimaryGeneratedColumn({ comment: 'PK' })
	id: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 20, comment: '' })
	username: string;

	@Column({ type: 'varchar', length: 60, comment: '' })
	password: string;

	@Column({ type: 'varchar', length: 20, comment: '' })
	password_masked: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	'update_at': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'insert_at': Date;
}
