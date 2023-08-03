import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	app.enableCors({
		origin: process.env.APP_API,
	});
	app.setGlobalPrefix('api');
	const PORT = process.env.PORT || 3000;

	const config = new DocumentBuilder()
		.setTitle('Blog documentation')
		.setDescription('Api blog')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(PORT);
}
bootstrap();
