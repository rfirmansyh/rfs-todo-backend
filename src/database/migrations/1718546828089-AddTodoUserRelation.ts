import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodoUserRelation1718546828089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "todos"
      ADD "user_id" integer
    `);

    await queryRunner.query(`
      ALTER TABLE "todos"
      ADD CONSTRAINT "fk_todo_user"
      FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "todos"
      DROP CONSTRAINT "fk_todo_user"
    `);

    await queryRunner.query(`
      ALTER TABLE "todos"
      DROP COLUMN "user_id"
    `);
  }
}
