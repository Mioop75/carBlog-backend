import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultFalseVerificationUser1688818314356 implements MigrationInterface {
    name = 'SetDefaultFalseVerificationUser1688818314356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isVerified" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isVerified" DROP DEFAULT`);
    }

}
