// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class LyricsList {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@Column({ type: 'varchar', length: 10 })
// 	lyrics_id: string;

// 	@Column({ type: 'varchar', length: 11, default: '' })
// 	video_id: string;

// 	@Column({ type: 'varchar', length: 20 })
// 	artist: string;

// 	@Column({ type: 'varchar', length: 20 })
// 	song: string;

// 	@Column({ type: 'text' })
// 	lyrics: string;

// 	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
// 	'update_time': Date;

// 	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
// 	'insert_time': Date;
// }
