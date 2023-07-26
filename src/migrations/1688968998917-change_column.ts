import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumn1688968998917 implements MigrationInterface {
    name = 'ChangeColumn1688968998917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_cd1bddce36edc3e766798eab376"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_cd1bddce36edc3e766798eab376"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "slug" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug")`);
    }

}
