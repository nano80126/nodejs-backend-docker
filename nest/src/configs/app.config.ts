export default () => ({
	host: process.env.HOST || '127.0.0.1',
	port: parseInt(process.env.PORT) || 3000,
});
