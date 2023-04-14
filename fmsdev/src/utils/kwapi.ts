import isEmpty from 'is-empty';
import { createHmac } from 'crypto';
import axios from 'axios';
import { merge } from 'lodash';

export const waApiKey = () => {
	const tag = 'waApiKey';

	const partA = process.env.WA_TOKEN;
	const partB = Buffer.from(Math.floor(new Date().getTime() / 1000).toString(), 'utf-8').toString('base64');
	const partC = createHmac('SHA256', process.env.WA_HOT_KEY as string)
		.update(`${partA}.${partB}`)
		.digest('hex');
	return `${partA}.${partB}.${partC}`;
};

export const doGet = async (params: any, headers: any = {}) => {
	const tag = 'doGet';
	const url = process.env.WA_API_BASE_URL + '/CarNavi/Directions';
	const _headers = isEmpty(headers) ? { Authorization: waApiKey() } : merge(headers, { Authorization: waApiKey() });

	return axios
		.get(url, {
			params,
			headers: _headers,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.error(err);
		});
};
