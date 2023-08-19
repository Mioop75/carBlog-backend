import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentEntity } from 'src/comments/comment.entity';
import { MediaModule } from 'src/media/media.module';
import { RolesModule } from 'src/roles/roles.module';
import { TagEntity } from 'src/tags/tag.entity';
import { TagsModule } from 'src/tags/tags.module';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			TagEntity,
			PostEntity,
			CommentEntity,
		]),
		TagsModule,
		AuthModule,
		RolesModule,
		MediaModule,
	],
	exports: [PostsService],
})
export class PostsModule {}
