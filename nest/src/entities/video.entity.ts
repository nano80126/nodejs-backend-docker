import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Lyrics } from './lyrics.entity';

@Entity()
export class Video {
	@PrimaryGeneratedColumn()
	id: number;

	// @Index({ unique: true })
	@Column({ type: 'varchar', length: 11 })
	video_key: string;

	// @Column({ type: 'varchar', length: 10 })
	@JoinColumn({ name: 'lyrics_id' })
	@ManyToOne(() => Lyrics, (lyrics) => lyrics.videos)
	lyrics_id: Lyrics;

	@Column({ type: 'varchar', length: 50 })
	title: string;

	@Column({ type: 'varchar', length: 50 })
	artist: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	'update_time': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'insert_time': Date;
}
