import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeRole1682351365614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE roles AS ENUM ('creator', 'associate', 'admin', 'user')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TYPE roles');
  }
}
