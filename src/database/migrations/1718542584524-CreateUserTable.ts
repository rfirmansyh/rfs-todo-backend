import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1718542584524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('user', 'admin')",
    );
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id"          SERIAL PRIMARY KEY,
        "name"        character varying,
        "username"    character varying,
        "email"       character varying,
        "password"    character varying,
        "role"        "users_role_enum" NOT NULL DEFAULT 'user',
        "created_at"  TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at"  TIMESTAMP DEFAULT now() NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
