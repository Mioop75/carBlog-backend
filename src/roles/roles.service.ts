import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>
	) {}

	getOne(name: string) {
		return this.roleRepository.findOne({
			where: { name },
			relations: { users: true },
		});
	}
}
