import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-uesr.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { User } from 'src/users/user.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	registration(@Body() dto: CreateUserDto) {
		return this.authService.registration(dto);
	}

	@Post('login')
	login(@Body() dto: UpdateUserDto) {
		return this.authService.login(dto.username, dto.password);
	}

	@UseGuards(AuthGuard)
	@Get('getMe')
	getMe(@User('username') username: string) {
		return this.authService.getMe(username);
	}
}
