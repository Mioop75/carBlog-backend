import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, NotContains } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@NotContains(' ')
	username: string;

	@ApiProperty()
	@IsString()
	@NotContains(' ')
	password: string;
}
