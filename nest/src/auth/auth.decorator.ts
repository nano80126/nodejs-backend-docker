import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipApiKey = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_SKIP_JWT = 'isSkipJwt';
export const SkipJwtToken = () => SetMetadata(IS_SKIP_JWT, true);
