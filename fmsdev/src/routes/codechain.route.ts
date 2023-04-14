import { Router } from 'express';
import { convertDateArr } from '../utils/iov';

const router = Router();

router.get('/daily-data/:enabledCode/:startTime/:endTime', (req, res) => {
	//
	const { enabledCode, startTime, endTime } = req.params;

	const dates = convertDateArr(startTime, endTime);

	res.status(200).send({ dates });
});

export default router;
