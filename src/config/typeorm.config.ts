import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: '.env' });

export const typeorm: TypeOrmModule = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT || 5432,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['dist/**/*.entity{.ts,.js}'],
	migrations: ['dist/migrations/*{.ts,.js}'],
	logging: true,
};

export default new DataSource(typeorm as DataSourceOptions);
