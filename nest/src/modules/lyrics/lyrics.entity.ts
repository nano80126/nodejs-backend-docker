import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Video } from '@/modules/video/entities/video.entity';

/**搜尋歌詞 entity */
@Entity()
@Index(['song', 'artist'], { unique: true })
export class SearchRecord extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20, comment: '歌曲名' })
	song: string;

	@Column({ type: 'varchar', length: 20, comment: '歌手名' })
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
export class Lyrics extends BaseEntity {
	@PrimaryGeneratedColumn({ comment: 'PK' })
	id: number;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 10, comment: '歌詞 key, 來自歌詞網站' })
	lyrics_key: string;

	// @Column({ type: 'varchar' })
	@OneToMany(() => Video, (video) => video.lyrics_id)
	videos: Video[];

	@Column({ type: 'varchar', length: 20, comment: '演唱者' })
	artist: string;

	@Index()
	@Column({ type: 'varchar', length: 20, comment: '歌曲名' })
	song: string;

	@Column({ type: 'text', comment: '歌詞內容' })
	lyrics: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	'update_time': Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	'insert_time': Date;
}
