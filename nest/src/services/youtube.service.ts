import { Injectable } from '@nestjs/common';

import { youtube, youtube_v3 } from '@googleapis/youtube';
import { YouTubeInfoResDTO, YouTubeThumbnailDTO } from '@/abstract/interface/youtube.interface';
import * as moment from 'moment';

@Injectable()
export class YouTubeService {
	yt: youtube_v3.Youtube;
	constructor() {
		this.yt = youtube({
			auth: process.env.YT_API_KEY,
			version: 'v3',
		});
	}

	// yt = youtube('v3');

	/**
	 *
	 * @param queryString 搜尋關鍵字
	 * @param pageToken 上/下一頁
	 */
	async getSearchList(queryString: string, pageToken?: string) {
		const result: { error?: Error; data?: youtube_v3.Schema$SearchListResponse } = {};

		try {
			const res = await this.yt.search.list({
				part: ['snippet'],
				q: queryString,
				type: ['video'],
				pageToken: pageToken,
				maxResults: 20,
			});

			result.data = res.data;
		} catch (err) {
			result.error = err;
		}
		return result;
	}

	async getVideoInfo(videoID: string) {
		const result: { error?: Error; data?: YouTubeInfoResDTO } = {};

		try {
			const res = await this.yt.videos.list({
				part: ['contentDetails', 'status'],
				id: [videoID],
			});

			const details = res.data.items[0].contentDetails;
			const status = res.data.items[0].status;

			const split = details.duration.split(/[(PT)HMS]/);
			const time = moment(`${split[1] || '00'}:${split[2] || '00'}:${split[3] || '00'}`, 'H:m:s').format(
				'HH:mm:ss',
			);

			result.data = {
				definition: details.definition == 'hd' ? 'HD' : 'SD',
				dimension: details.dimension == '2d' ? '2D' : '3D',
				duration: time,
				embeddable: status.embeddable,
			};
		} catch (err) {
			result.error = err;
		}

		return result;
	}

	async getVideoThumbnail(videoID: string) {
		const result: { error?: Error; data?: YouTubeThumbnailDTO } = {};

		console.log(videoID);

		try {
			const res = await this.yt.videos.list({
				part: ['snippet'],
				id: [videoID],
			});

			console.log(res);
			console.log(res.data);
			const snippet = res.data.items[0].snippet;
			const thumbnails = snippet.thumbnails;
			// const { default, medium, high, standard , maxres } = thumbnails;

			const image =
				thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;
			const { url, width, height } = image;
			result.data = { url: new URL(url), width, height };
		} catch (err) {
			result.error = err;
		}
		return result;
	}
}
