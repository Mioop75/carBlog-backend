import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnViewsUser1689227629871 implements MigrationInterface {
    name = 'AddNewColumnViewsUser1689227629871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "views" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "views"`);
    }

}
