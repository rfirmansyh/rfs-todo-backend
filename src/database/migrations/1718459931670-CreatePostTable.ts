import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1718459931670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "todos" (
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        "title" VARCHAR,
        "content" VARCHAR,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP DEFAULT now() NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "todos"');
  }
}
