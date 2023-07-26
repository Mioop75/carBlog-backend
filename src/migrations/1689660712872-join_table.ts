import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinTable1689660712872 implements MigrationInterface {
    name = 'JoinTable1689660712872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_id" ("tagId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_a694b04b3e556ccc5de1b39e97a" PRIMARY KEY ("tagId", "postId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dac9d1dae5931a82277b168774" ON "post_id" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c68ecc9018a18c7aaa86df3701" ON "post_id" ("postId") `);
        await queryRunner.query(`CREATE TABLE "tag_id" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_be9baaba56a2257a75334a8beef" PRIMARY KEY ("postId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34c0aa41722b6a6f4c18657a49" ON "tag_id" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b746a53ca98571702ea73f413c" ON "tag_id" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "post_id" ADD CONSTRAINT "FK_dac9d1dae5931a82277b1687749" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_id" ADD CONSTRAINT "FK_c68ecc9018a18c7aaa86df37015" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_id" ADD CONSTRAINT "FK_34c0aa41722b6a6f4c18657a497" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_id" ADD CONSTRAINT "FK_b746a53ca98571702ea73f413ce" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_id" DROP CONSTRAINT "FK_b746a53ca98571702ea73f413ce"`);
        await queryRunner.query(`ALTER TABLE "tag_id" DROP CONSTRAINT "FK_34c0aa41722b6a6f4c18657a497"`);
        await queryRunner.query(`ALTER TABLE "post_id" DROP CONSTRAINT "FK_c68ecc9018a18c7aaa86df37015"`);
        await queryRunner.query(`ALTER TABLE "post_id" DROP CONSTRAINT "FK_dac9d1dae5931a82277b1687749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b746a53ca98571702ea73f413c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34c0aa41722b6a6f4c18657a49"`);
        await queryRunner.query(`DROP TABLE "tag_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c68ecc9018a18c7aaa86df3701"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dac9d1dae5931a82277b168774"`);
        await queryRunner.query(`DROP TABLE "post_id"`);
    }

}
