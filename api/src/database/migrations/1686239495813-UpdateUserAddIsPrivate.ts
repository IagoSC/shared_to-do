import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAddIsPrivate1686239495813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_groups" ADD "is_private" boolean NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_groups" DROP COLUMN "is_private"`
    );
  }
}
