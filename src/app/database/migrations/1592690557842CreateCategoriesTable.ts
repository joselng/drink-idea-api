import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCategoriesTable1592690557842
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(80)',
            isNullable: false,
          },
          {
            name: 'display',
            type: 'varchar(80)',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
