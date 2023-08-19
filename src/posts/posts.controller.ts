import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
	create(@Body() dto: CreatePostDto, @User('id') userId: number) {
		return this.postsService.create(dto, userId);
	}

	@Put(':id')
	@UseGuards(AuthGuard)
	update(
		@Param('id') postId: number,
		@User('id') userId: number,
		@Body() dto: CreatePostDto,
		@Body() tagIds: number[]
	) {
		return this.postsService.update(postId, userId, dto, tagIds);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	delete(@Param('id') postId: number, @User('id') userId: number) {
		return this.postsService.delete(postId, userId);
	}

	@UseGuards(AuthGuard)
	@Put('admin/:id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	updateByAdmin(
		@Param('id') postId: number,
		@Body() dto: CreatePostDto,
		@Body() tagIds: number[]
	) {
		return this.postsService.updateByAdmin(postId, dto, tagIds);
	}

	@Delete('admin/:id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	deleteByAdmin(@Param('id') postId: number) {
		return this.postsService.deleteByAdmin(postId);
	}
}
