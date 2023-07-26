import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(CommentEntity)
		private commentRepository: Repository<CommentEntity>,
		private postsService: PostsService
	) {}

	async create(dto: CreateCommentDto, userId: number) {
		const post = await this.postsService.getOne(dto.slug);

		if (!post) {
			throw new NotFoundException('Пост не найден');
		}

		const newCommnet = this.commentRepository.create({
			text: dto.text,
			post: { id: post.id },
			author: { id: userId },
		});

		return await this.commentRepository.save(newCommnet);
	}

	async update(commentId: number, userId: number, text: string) {
		const oldComment = await this.commentRepository.findOneBy({
			id: commentId,
		});

		if (!oldComment) {
			throw new NotFoundException('Коммент не найден');
		}

		if (oldComment.author.id !== userId) {
			throw new BadRequestException('Вы не автор того коммента');
		}

		await this.commentRepository.update(commentId, { text });

		return 'Коммент был редактирован';
	}

	async delete(commentId: number, userId: number) {
		const comment = await this.commentRepository.findOneBy({ id: commentId });

		if (!comment) {
			throw new NotFoundException('Коммент не найден');
		}

		if (comment.author.id !== userId) {
			throw new BadRequestException('Вы не автор того коммента');
		}

		await this.commentRepository.delete(commentId);

		return 'Коммент был удален';
	}

	async updateByAdmin(commentId: number, text: string) {
		const oldComment = await this.commentRepository.findOneBy({
			id: commentId,
		});

		if (!oldComment) {
			throw new NotFoundException('Коммент не найден');
		}

		await this.commentRepository.update(commentId, { text });

		return 'Коммент был редактирован админом';
	}

	async deleteByAdmin(commentId: number) {
		const comment = await this.commentRepository.findOneBy({ id: commentId });

		if (!comment) {
			throw new NotFoundException('Коммент не найден');
		}

		await this.commentRepository.delete(commentId);

		return 'Коммент был удален админом';
	}
}
