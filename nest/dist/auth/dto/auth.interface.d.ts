export interface validateUserResDto {
    id: number;
    account: string;
    roles: string[];
}
export interface jwtPayloadDto extends validateUserResDto {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}
