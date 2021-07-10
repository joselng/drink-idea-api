import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFavoritesTable1592690557841
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'user_id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'drink_id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorites');
  }
}
