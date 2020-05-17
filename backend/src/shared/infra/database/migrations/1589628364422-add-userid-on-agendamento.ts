import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addUseridOnAgendamento1589628364422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('agendamentos', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true
        }))

        await queryRunner.createForeignKey('agendamentos', new TableForeignKey({
            name: 'agendamento_user_id',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuarios',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('agendamento', 'agendamento_user_id')
        await queryRunner.dropColumn('agendamento', 'user_id')
    }

}
