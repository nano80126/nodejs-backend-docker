import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
	@ApiProperty({ maxLength: 20, required: true, description: '帳號' })
	username: string;
	@ApiProperty({ maxLength: 20, required: true, description: '密碼' })
	password: string;
	@ApiProperty({ maxLength: 20, required: true, description: '密碼(重複)' })
	passwordRepeat: string;
}
