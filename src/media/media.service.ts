import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';

@Injectable()
export class MediaService {
	async upload(file: Express.Multer.File, folder: string = 'default') {
		const uploadFolder = `upload/${folder}`;

		if (!existsSync(uploadFolder)) {
			await mkdir(uploadFolder);
		}

		const randomName = Array(32)
			.fill(null)
			.map(() => Math.round(Math.random() * 16).toString(16))
			.join('');

		const typeFile = file.mimetype.split('/')[1];

		await writeFile(`${uploadFolder}/${randomName}.${typeFile}`, file.buffer);

		return {
			path: `${uploadFolder}/${randomName}.${typeFile}`,
			name: `${randomName}.${typeFile}`,
		};
	}

	uploadFiles(files: Array<Express.Multer.File>): Array<Express.Multer.File> {
		return files;
	}

	delete(pathFile: string): string {
		try {
			unlinkSync(pathFile);
			return 'File was deleted';
		} catch (error) {
			throw new BadRequestException('Произошла неизвестная ошибка');
		}
	}
}
