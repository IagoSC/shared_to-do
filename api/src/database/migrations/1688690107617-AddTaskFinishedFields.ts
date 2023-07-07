import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskFinishedFields1688690107617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        ALTER TABLE tasks
            ADD COLUMN is_finished boolean DEFAULT false;
        ALTER TABLE tasks
            ADD COLUMN finished_at date DEFAULT null;        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        ALTER TABLE tasks
            DROP COLUMN is_finished;
        ALTER TABLE tasks
            DROP COLUMN finished_at;
    `);
  }
}
