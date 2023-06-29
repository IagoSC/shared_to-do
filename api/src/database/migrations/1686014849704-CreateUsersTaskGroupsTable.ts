import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersGroupsTable1686014849704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users_groups" (
            "user_id" uuid NOT NULL,
            "group_id" uuid NOT NULL,
            UNIQUE ("user_id", "group_id"),
            CONSTRAINT "user_group_pk" PRIMARY KEY ("user_id", "group_id"),
            CONSTRAINT "user_fk_user_group" 
              FOREIGN KEY ("user_id") REFERENCES users ("id"),
            CONSTRAINT "group_fk_user_group" 
              FOREIGN KEY ("group_id") REFERENCES groups ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_groups");
  }
}
