import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1628849534983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        username varchar(255) NOT NULL,
        password_hash varchar(256) NOT NULL,
        email varchar(256) NOT NULL,
        firstquestion varchar(256),
        secondquestion varchar(256),
        created_at timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NULL DEFAULT NOW(),
        CONSTRAINT user_pk PRIMARY KEY (id),
        CONSTRAINT user_un_username UNIQUE (username)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
