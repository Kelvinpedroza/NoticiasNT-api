import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentsTable1724195915549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE comments (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                userName varchar(255) NOT NULL,
                description varchar(255) NULL,
                rating varchar(10) NULL ,
                created_at timestamptz NOT NULL DEFAULT NOW(),
                deleted_at timestamptz NULL,
                CONSTRAINT comment_pk PRIMARY KEY (id)
            );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS comments;`)
    }

}
