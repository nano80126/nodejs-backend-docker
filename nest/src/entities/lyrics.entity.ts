import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lyrics {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20, default: '' })
	artist: string;

	@Column({ type: 'varchar', length: 20, default: '' })
	song: string;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	'insert_time': Date;
}
