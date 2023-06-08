import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEmailUniqueConstraint1686239415164
  implements MigrationInterface
{
  name = "UpdateUserEmailUniqueConstraint1686239415164";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE ("email")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "users_email_unique"`
    );
  }
}
