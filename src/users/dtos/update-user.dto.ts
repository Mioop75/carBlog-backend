import { ApiProperty } from '@nestjs/swagger';
import { IsString, NotContains } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	@NotContains(' ')
	username: string;

	@ApiProperty()
	@IsString()
	@NotContains(' ')
	password: string;
}
