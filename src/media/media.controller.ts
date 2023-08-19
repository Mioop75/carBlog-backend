import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post('upload')
	@HttpCode(200)
	// @UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder: string
	) {
		return this.mediaService.upload(file, folder);
	}

	@Post('upload/files')
	@UseGuards(AuthGuard)
	@UseInterceptors(FilesInterceptor('files'))
	uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
		return files;
	}
}
