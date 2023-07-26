import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationsPostTag1687857293016 implements MigrationInterface {
    name = 'ChangeRelationsPostTag1687857293016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_7435e891c35f2687d7969490476"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "postId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_7435e891c35f2687d7969490476" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
