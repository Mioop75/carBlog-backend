import { ApiProperty } from '@nestjs/swagger';
import { IsString, NotContains } from 'class-validator';

export class CreateTagDto {
	@ApiProperty()
	@IsString()
	@NotContains(' ')
	name: string;
}
