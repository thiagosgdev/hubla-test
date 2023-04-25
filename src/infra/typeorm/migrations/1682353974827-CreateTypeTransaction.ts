import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeTransaction1682353974827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE transaction_type AS ENUM ('sale_creator', 'sale_associate', 'comission_paid', 'comission_received')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TYPE transaction_type');
  }
}
