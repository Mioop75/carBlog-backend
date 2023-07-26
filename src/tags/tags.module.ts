import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostEntity } from 'src/posts/post.entity';
import { RolesModule } from 'src/roles/roles.module';
import { TagEntity } from './tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
	controllers: [TagsController],
	providers: [TagsService],
	imports: [
		TypeOrmModule.forFeature([TagEntity, PostEntity]),
		AuthModule,
		RolesModule,
	],
	exports: [TagsService],
})
export class TagsModule {}
