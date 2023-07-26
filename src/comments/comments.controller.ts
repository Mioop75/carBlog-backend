import {
	Body,
	Controller,
	Delete,
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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	@UseGuards(AuthGuard)
	create(@Body() dto: CreateCommentDto, @User('id') userId: number) {
		return this.commentsService.create(dto, userId);
	}

	@Put(':id')
	@UseGuards(AuthGuard)
	update(
		@Body() text: string,
		@Param('id') commentId: number,
		@User('id') userId: number
	) {
		return this.commentsService.update(commentId, userId, text);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	delete(@Param('id') commentId: number, @User('id') userId: number) {
		return this.commentsService.delete(commentId, userId);
	}

	@Put('admin/:id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	updateByAdmin(@Body() text: string, @Param('id') commentId: number) {
		return this.commentsService.updateByAdmin(commentId, text);
	}

	@Delete('admin/:id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin, Role.Moderator)
	deleteByAdmin(@Param('id') commentId: number) {
		return this.commentsService.deleteByAdmin(commentId);
	}
}
