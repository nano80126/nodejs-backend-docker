export interface jwtPayloadDto {
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
	/**帳號 */
	account: string;
	uid: number;
	roles?: string[];
}
