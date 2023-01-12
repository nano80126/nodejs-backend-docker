import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lyrics {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	artist: string;

	@Column()
	song: string;

	@Column({ type: 'timestamptz', nullable: false })
	insertTime: Date;
}
