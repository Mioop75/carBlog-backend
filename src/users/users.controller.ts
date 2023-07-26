import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateUserDto } from './dtos/create-uesr.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.decorator';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// User

	@Get(':username')
	getOne(@Param('username') username: string) {
		return this.usersService.getOne(username);
	}

	@Put()
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileInterceptor('avatar', {
			storage: diskStorage({
				destination: './upload/avatars',
				filename(req, file, callback) {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					callback(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		})
	)
	update(
		@User('id') id: number,
		@UploadedFile() avatar: Express.Multer.File,
		@Body() dto: UpdateUserDto
	) {
		return this.usersService.update(id, dto, avatar?.path);
	}

	@Delete()
	@UseGuards(AuthGuard)
	delete(@User('id') id: number) {
		return this.usersService.delete(id);
	}

	@Get('activate-link/:id')
	activateLink(@Param('id') id: string) {
		return this.usersService.verifyProfile(id);
	}

	// Admin and Moderator

	@Post()
	createUserByAdmin(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto, 'Admin');
	}

	@Put(':id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	@UseInterceptors(
		FileInterceptor('avatar', {
			storage: diskStorage({
				destination: './upload/avatars',
				filename(req, file, callback) {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('');
					callback(null, `${randomName}${extname(file.originalname)}`);
				},
			}),
		})
	)
	updateUserByAdmin(
		@Param('id') id: number,
		@UploadedFile() avatar: Express.Multer.File,
		@Body() dto: UpdateUserDto
	) {
		return this.usersService.updateByAdmin(id, dto, avatar?.path);
	}

	@Delete(':id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	deleteUserByAdmin(@Param('id') id: number) {
		return this.usersService.deleteByAdmin(id);
	}

	// @Get('give-moderator/:username')
	// giveModerator(@Param('username') username: string) {
	// 	return this.usersService.getOne(username);
	// }
}
