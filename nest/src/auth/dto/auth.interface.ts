/**validateUser response dto */
export interface validateUserResDto {
	id: number;
	account: string;
	roles: string[];
}

/**jwt payload */
export interface jwtPayloadDto extends validateUserResDto {
	/**發行人 */
	iss?: string;
	/**主題 */
	sub?: string;
	/**受眾 */
	aud?: string;
	/**過期時間 */
	exp?: number;
	/**生效時間 */
	nbf?: number;
	/**發行時間 */
	iat?: number;
	/**JWT ID */
	jti?: string;
}
