import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/create-uesr.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private jwt: JwtService, private userService: UsersService) {}

	async registration(dto: CreateUserDto) {
		const user = await this.userService.create(dto);
		const tokens = this.generateTokens({
			id: user.id,
			username: user.username,
			role: user.role,
		});
		return {
			user,
			...tokens,
		};
	}

	async login(username: string, password: string) {
		const user = await this.userService.getOne(username);

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		const comparedPassword = compareSync(password, user.password);

		if (!comparedPassword) {
			throw new ForbiddenException('Неправильный пароль');
		}

		const tokens = this.generateTokens({
			id: user.id,
			username: user.username,
			role: user.role,
		});

		return {
			user,
			...tokens,
		};
	}

	async getMe(username: string) {
		const user = await this.userService.getOne(username);

		const tokens = this.generateTokens({
			id: user.id,
			username: user.username,
			role: user.role,
		});

		return {
			user,
			...tokens,
		};
	}

	private generateTokens(payload: any) {
		const accessToken = this.jwt.sign(payload);
		const refreshToken = this.jwt.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: '32d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	verifyToken(token: string) {
		return this.jwt.verify(token, { secret: process.env.JWT_SECRET });
	}

	verifyRefreshToken(token: string) {
		return this.jwt.verify(token, { secret: process.env.JWT_SECRET });
	}
}
