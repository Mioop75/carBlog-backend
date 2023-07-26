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
import { User } from 'src/users/user.decorator';
import { CreatePostDto } from './create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	getAll() {
		return this.postsService.getAll();
	}

	@Get(':slug')
	getOne(@Param('slug') slug: string) {
		return this.postsService.getOne(slug);
	}

	@Post()
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileInterceptor('preview', {
			storage: diskStorage({
				destination: './upload/previews',
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
	create(
		@Body() dto: CreatePostDto,
		@User('id') userId: number,
		@UploadedFile('preview') preview: Express.Multer.File
	) {
		return this.postsService.create(dto, userId, preview);
	}

	@Put(':id')
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileInterceptor('preview', {
			storage: diskStorage({
				destination: './upload/previews',
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
		@Param('id') postId: number,
		@User('id') userId: number,
		@Body() dto: CreatePostDto,
		@UploadedFile() preview: Express.Multer.File,
		@Body() tagIds: number[]
	) {
		return this.postsService.update(postId, userId, dto, tagIds, preview.path);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	delete(@Param('id') postId: number, @User('id') userId: number) {
		return this.postsService.delete(postId, userId);
	}

	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileInterceptor('preview', {
			storage: diskStorage({
				destination: './upload/previews',
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
	@Put('admin/:id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	updateByAdmin(
		@Param('id') postId: number,
		@Body() dto: CreatePostDto,
		@Body() tagIds: number[],
		@UploadedFile() preview?: Express.Multer.File
	) {
		return this.postsService.updateByAdmin(postId, dto, tagIds, preview.path);
	}

	@Delete('admin/:id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	deleteByAdmin(@Param('id') postId: number) {
		return this.postsService.deleteByAdmin(postId);
	}
}
