import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1686014554983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "tasks" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying NOT NULL,
            "description" character varying NOT NULL,
            "group_id" uuid NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "groups_fk_tasks" 
              FOREIGN KEY ("group_id")
                REFERENCES groups ("id"),
            CONSTRAINT "tasks_pk" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
