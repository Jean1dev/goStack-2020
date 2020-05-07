import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class alterarTableAgendamentos1587325001938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('agendamentos', 'provider')
        await queryRunner.addColumn('agendamentos', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true
        }))

        await queryRunner.createForeignKey('agendamentos', new TableForeignKey({
            name: 'agendamento_usuario',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuarios',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('agendamentos', 'agendamento_usuario')
        await queryRunner.dropColumn('agendamentos', 'provider_id')
        await queryRunner.addColumn('agendamentos', new TableColumn({
            name: 'provider',
            type: 'varchar'
        }))
    }

}
