import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lyrics {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	artist: string;

	@Column({ type: 'varchar', length: 20 })
	song: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	insertTime: Date;

	@Column({ type: 'time', default: null })
	time: string;

	@Column({ type: 'date', default: null })
	date: string;
}
