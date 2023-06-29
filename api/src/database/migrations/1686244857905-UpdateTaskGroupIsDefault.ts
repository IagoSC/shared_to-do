import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGroupIsDefault1686244857905 implements MigrationInterface {
  name = "UpdateGroupIsDefault1686244857905";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" RENAME COLUMN "is_private" TO "is_default"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" RENAME COLUMN "is_default" TO "is_private"`
    );
  }
}
