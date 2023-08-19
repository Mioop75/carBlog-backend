import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './create-tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagsService {
	constructor(
		@InjectRepository(TagEntity)
		private readonly tagRepository: Repository<TagEntity>
	) {}

	async getAll(tagIds?: number[], postId?: number) {
		if (tagIds) {
			return await this.tagRepository.find({
				where: { id: In(tagIds) },
			});
		}

		return await this.tagRepository.find();
	}

	async getOne(id: number) {
		const tag = await this.tagRepository.findOneBy({ id });

		if (!tag) {
			throw new BadRequestException('Данного тег не существует');
		}

		return tag;
	}

	async create(dto: CreateTagDto) {
		try {
			const tag = this.tagRepository.create({ ...dto });

			return await this.tagRepository.save(tag);
		} catch (error) {
			throw new BadRequestException('Данный тег уже существует');
		}
	}

	async update(id: number, dto: CreateTagDto) {
		const tag = await this.tagRepository.findOneBy({ id });

		if (tag) {
			throw new BadRequestException('Данного тег не существует');
		}

		await this.tagRepository.update(id, { ...dto });

		return await this.tagRepository.save(tag);
	}

	async delete(id: number) {
		const tag = this.tagRepository.find({ where: { id } });

		if (tag) {
			throw new BadRequestException('Данного тег не существует');
		}

		await this.tagRepository.delete(id);

		return 'Тег был удален';
	}
}
