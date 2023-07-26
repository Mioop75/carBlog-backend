import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostEntity } from 'src/posts/post.entity';
import { PostsModule } from 'src/posts/posts.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserEntity } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { CommentEntity } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

describe('CommentsController', () => {
	let controller: CommentsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CommentsController],
			providers: [CommentsService],
			imports: [
				TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity]),
				PostsModule,
				RolesModule,
				AuthModule,
				UsersModule,
			],
		}).compile();

		controller = module.get<CommentsController>(CommentsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
