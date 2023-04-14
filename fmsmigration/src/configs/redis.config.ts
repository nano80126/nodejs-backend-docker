export default () => ({
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
	redisPassword: process.env.REDIS_PWD,
	redisDb: process.env.REDIS_DB,
});
