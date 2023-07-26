import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { RoleEntity } from './role.entity';
import { RolesService } from './roles.service';

@Module({
	controllers: [],
	providers: [RolesService],
	imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
	exports: [RolesService],
})
export class RolesModule {}
