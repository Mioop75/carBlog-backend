import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentEntity } from 'src/comments/comment.entity';
import { PostEntity } from 'src/posts/post.entity';
import { RoleEntity } from 'src/roles/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forFeature([
			UserEntity,
			RoleEntity,
			PostEntity,
			CommentEntity,
		]),
		forwardRef(() => AuthModule),
		RolesModule,
	],
	exports: [UsersService],
})
export class UsersModule {}
