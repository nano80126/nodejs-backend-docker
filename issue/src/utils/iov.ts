import moment from 'moment';
// import {} from "lodash"

export const callApi = (url: string, data: any, failureStatus: number, tag: string) => {
	//
};

/**
 *
 * @param data
 * @returns
 */
export const getExternalDeviceDetail = (data: any) => {
	const tag = 'getExternalDeviceDetail';
	const url = '/api/v1/externalDevicesDetail';
	const failureStatus = 4034012;

	return callApi(url, data, failureStatus, tag);
};

/**
 *
 * @param startDate 開始日期 (formart: YYYYMMDD)
 * @param endDate 結束日期 (format: YYYYMMDD)
 */
export const convertDateArr = (startDate: string, endDate: string) => {
	let i = 0;
	const dates: string[] = [];

	const st = moment(startDate, 'YYYYMMDD').startOf('day');
	const end = moment(endDate, 'YYYYMMDD').startOf('day');

	// dates.push(st.format('YYYYMMDD'));
	while (i <= moment(end).diff(st, 'days')) {
		const date = moment(startDate).add(i, 'days').format('YYYYMMDD');
		dates.push(date);
		i++;
	}
	return dates;
};
