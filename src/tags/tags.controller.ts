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
import { CreateTagDto } from './create-tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Post()
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	create(@Body() dto: CreateTagDto) {
		return this.tagsService.create(dto);
	}

	@Get()
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	getAll() {
		return this.tagsService.getAll();
	}

	@Put()
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	update() {}

	@Delete(':id')
	@UseGuards(AuthGuard, RolesGuard)
	@Roles(Role.Admin)
	delete(@Param('id') id: number) {}
}
