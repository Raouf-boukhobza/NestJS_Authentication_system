import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTable1749727628225 implements MigrationInterface {
    name = 'UpdateUsersTable1749727628225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isActive\``);
    }

}
