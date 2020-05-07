import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class criarCampoAvatarEmUsuarios1587330076369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('usuarios', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('usuarios', 'avatar')
    }

}
