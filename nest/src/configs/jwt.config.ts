export default () => ({
	jwtSecret: process.env.JWT_SECRET,
	jwtIssuer: process.env.JWT_ISSUER,
	jwtSubject: process.env.JWT_SUBJECT,
	jwtAudience: process.env.JWT_AUDIENCE,
});
