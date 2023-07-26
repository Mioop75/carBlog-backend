import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnUser1689224353847 implements MigrationInterface {
    name = 'AddNewColumnUser1689224353847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "activateLink" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "activateLink"`);
    }

}
