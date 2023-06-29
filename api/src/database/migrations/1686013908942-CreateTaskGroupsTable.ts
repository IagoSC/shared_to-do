import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupsTable1686013908942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "groups" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "groups_pk" PRIMARY KEY ("id")
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "groups"`);
  }
}
