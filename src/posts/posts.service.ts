import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostEntity)
		private postRepository: Repository<PostEntity>,
		private tagsService: TagsService
	) {}

	async getAll() {
		return await this.postRepository.find({
			relations: { tags: true, author: true },
		});
	}

	async getOne(slug: string) {
		const post = await this.postRepository.findOne({
			where: { slug },
			relations: {
				comments: { author: true },
				tags: true,
				author: true,
			},
		});

		post.views++;
		return post;
	}

	async create(
		dto: CreatePostDto,
		userId: number,
		preview?: Express.Multer.File
	) {
		const post = this.postRepository.create({ ...dto, author: { id: userId } });

		if (preview !== undefined) {
			post.preview = preview.path;
		}

		if (dto.tagIds) {
			const tags = await this.tagsService.getAll(dto.tagIds);
			post.tags = tags;
		}

		return await this.postRepository.save(post);
	}

	async update(
		postId: number,
		userId: number,
		dto: CreatePostDto,
		tagIds?: number[],
		preview?: string
	) {
		const currentPost = await this.postRepository.findOneBy({ id: postId });

		if (currentPost) {
			throw new NotFoundException('Пост не найден');
		}

		if (currentPost.author.id !== userId) {
			throw new BadRequestException('Вы не автор того пост');
		}

		const tags = await this.tagsService.getAll(tagIds);

		const slug = slugify(dto.title, { lower: true });

		await this.postRepository.update(postId, {
			...dto,
			slug,
			preview,
			tags,
		});

		return 'Пост был редактирован';
	}

	async delete(postId: number, userId: number) {
		const post = await this.postRepository.findOneBy({ id: postId });

		if (!post) {
			throw new NotFoundException('Пост не найден');
		}

		if (post.author.id !== userId) {
			throw new BadRequestException('Вы не автор того пост');
		}

		return 'Пост был удален';
	}

	async updateByAdmin(
		postId: number,
		dto: CreatePostDto,
		tagIds: number[],
		preview?: string
	) {
		const currentPost = await this.postRepository.findOneBy({ id: postId });

		if (currentPost) {
			throw new NotFoundException('Пост не найден');
		}

		const tags = await this.tagsService.getAll(tagIds);
		const slug = slugify(dto.title, { lower: true });

		await this.postRepository.update(postId, {
			...dto,
			slug,
			preview,
			tags,
		});

		return 'Пост был редактирован админом';
	}

	async deleteByAdmin(id: number) {
		const post = await this.postRepository.findOneBy({ id });

		if (!post) {
			throw new NotFoundException('Пост не найден');
		}

		return 'Пост был удален админом';
	}
}
