import { MailerService } from '@nestjs-modules/mailer';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-uesr.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		private roleService: RolesService,
		private mailerService: MailerService
	) {}

	async create(dto: CreateUserDto, roleName = 'User'): Promise<UserEntity> {
		const salt = genSaltSync(8);
		const hashPassword = hashSync(dto.password, salt);

		const role = await this.roleService.getOne(roleName);

		if (roleName == 'Admin' && 2 < role.users.length) {
			throw new BadRequestException('Только один админ может быть');
		}

		const randomName = Array(32)
			.fill(null)
			.map(() => Math.round(Math.random() * 16).toString(16))
			.join('');

		const newUser = this.userRepository.create({
			...dto,
			password: hashPassword,
			role: { id: role.id },
			activateLink: randomName,
		});

		const existUsername = await this.userRepository.findOneBy({
			username: newUser.username,
		});

		const existEmail = await this.userRepository.findOneBy({
			email: newUser.email,
		});

		if (existUsername || existEmail) {
			throw new BadRequestException(
				'Пользователь с таким именем или email уже существует'
			);
		}

		this.mailerService.sendMail({
			to: newUser.email,
			from: process.env.SMTP_USER,
			subject: 'Верификация',
			text: '',
			html: `
			<div>
				<h2>Активация аккаунта</h2>
				<a href="http://localhost:3000/api/users/activate-link/${newUser.activateLink}">Активировать аккаунт по ссылке</a>
			</div>`,
		});

		return await this.userRepository.save(newUser);
	}

	async getOne(username: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: { username },
			relations: { posts: true, role: true },
		});

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		return user;
	}

	async update(
		userId: number,
		dto: UpdateUserDto,
		avatar?: string
	): Promise<string> {
		const oldUser = await this.userRepository.findOneBy({ id: userId });

		if (!oldUser) {
			throw new NotFoundException('Пользователь не найден');
		}

		const salt = genSaltSync(8);
		const hashPassword = hashSync(dto.password, salt);

		await this.userRepository.update(userId, {
			username: dto.username,
			password: hashPassword,
			avatar,
		});
		return 'Пользователь был редактировать';
	}

	async delete(userId: number): Promise<string> {
		const user = await this.userRepository.findOneBy({ id: userId });

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		await this.userRepository.delete(userId);

		return 'Пользователь был удален';
	}

	async updateByAdmin(
		id: number,
		dto: UpdateUserDto,
		avatar?: string,
		reason?: string
	): Promise<string> {
		const oldUser = await this.userRepository.findOneBy({ id });

		if (!oldUser) {
			throw new NotFoundException('Пользователь не найден');
		}

		const salt = genSaltSync(8);
		const hashPassword = hashSync(dto.password, salt);

		await this.userRepository.update(id, {
			username: dto.username,
			password: hashPassword,
			avatar,
		});
		return 'Пользователь был редактировать админом';
	}

	async deleteByAdmin(id: number, reason?: string): Promise<string> {
		const user = await this.userRepository.findOneBy({ id });

		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		await this.userRepository.delete(id);

		return 'Пользователь был удален админом';
	}

	async verifyProfile(id: string) {
		const user = await this.userRepository.findOneBy({ activateLink: id });

		user.isVerified = true;

		return this.userRepository.save(user);
	}
}
