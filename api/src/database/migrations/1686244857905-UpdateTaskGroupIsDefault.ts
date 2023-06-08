import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskGroupIsDefault1686244857905
  implements MigrationInterface
{
  name = "UpdateTaskGroupIsDefault1686244857905";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_groups" RENAME COLUMN "is_private" TO "is_default"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_groups" RENAME COLUMN "is_default" TO "is_private"`
    );
  }
}
