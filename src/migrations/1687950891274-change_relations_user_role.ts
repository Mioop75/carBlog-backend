import { RoleEntity } from 'src/roles/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRelationsUserRole1687950891274
	implements MigrationInterface
{
	name = 'ChangeRelationsUserRole1687950891274';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "role" DROP CONSTRAINT "FK_e3583d40265174efd29754a7c57"`
		);
		await queryRunner.query(
			`ALTER TABLE "role" DROP CONSTRAINT "REL_e3583d40265174efd29754a7c5"`
		);
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "user_id"`);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "REL_fb2e442d14add3cefbdf33c456"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);

		const user = await queryRunner.manager.create<RoleEntity>(RoleEntity, {
			name: 'User',
		});

		await queryRunner.manager.save(user);

		const admin = await queryRunner.manager.create<RoleEntity>(RoleEntity, {
			name: 'Admin',
		});

		await queryRunner.manager.save(admin);

		const moderator = await queryRunner.manager.create<RoleEntity>(RoleEntity, {
			name: 'Moderator',
		});

		await queryRunner.manager.save(moderator);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "REL_fb2e442d14add3cefbdf33c456" UNIQUE ("role_id")`
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "role" ADD "user_id" integer`);
		await queryRunner.query(
			`ALTER TABLE "role" ADD CONSTRAINT "REL_e3583d40265174efd29754a7c5" UNIQUE ("user_id")`
		);
		await queryRunner.query(
			`ALTER TABLE "role" ADD CONSTRAINT "FK_e3583d40265174efd29754a7c57" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
