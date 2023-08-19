import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { typeorm } from './config/typeorm.config';
import { MediaModule } from './media/media.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(typeorm),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'upload'),
			serveRoot: '/',
			exclude: ['/api*'],
		}),
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				secure: false,
				port: +process.env.SMTH_PORT,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
		}),
		UsersModule,
		TagsModule,
		PostsModule,
		AuthModule,
		CommentsModule,
		RolesModule,
		MediaModule,
	],
})
export class AppModule {}
