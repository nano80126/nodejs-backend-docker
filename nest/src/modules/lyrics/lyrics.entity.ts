import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany, PrimaryColumn, Generated } from 'typeorm';
import { Video } from '@/entities/video.entity';

/**搜尋歌詞 entity */
@Entity()
// @Index(['song', 'artist'], { unique: true })
export class SearchRecord {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 20, comment: '123' })
	song: string;

	@Column({ type: 'varchar', length: 20, comment: '456' })
	artist: string;

	// @Index('updateTime')
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '' })
	'update_time': Date;

	// @Index('insertTime')
	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '' })
	'insert_time': Date;
}

/**儲存歌詞 entity */
@Entity()
@Index(['artist', 'song'], { unique: true })
// @Index([])
export class Lyrics {
	@PrimaryGeneratedColumn()
	id: number;

	// @Column()
	// @Generated('uuid')
	// uuid: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 10 })
	lyrics_key: string;

	// @Column({ type: 'varchar' })
	@OneToMany(() => Video, (video) => video.lyrics_id)
	videos: Video[];

	@Column({ type: 'varchar', length: 20 })
	artist: string;

	@Index()
	@Column({ type: 'varchar', length: 20 })
	song: string;

	@Column({ type: 'text' })
	lyrics: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	'update_time': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'insert_time': Date;
}
