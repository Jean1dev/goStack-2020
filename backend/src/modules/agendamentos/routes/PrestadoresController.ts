import { UseBefore, Controller, Get, Req, QueryParam } from "routing-controllers";
import authenticationMiddleware from '@shared/infra/http/middlewares/autenticacao'
import Usuario from "@modules/users/typeorm/model/Usuario";
import { Request } from "express";
import { container } from "tsyringe";
import ListPrestadoresService from "../services/ListPrestadoresService";
import Agendamento from "../typeorm/model/Agendamento";
import ListAgendamentosPrestador from "../services/ListAgendamentosPrestador";
import { classToClass } from "class-transformer";

@Controller('/prestadores')
@UseBefore(authenticationMiddleware)
export default class PrestadoresController {

    @Get()
    public async find(@Req() req: Request): Promise<Usuario[]> {
        return container.resolve(ListPrestadoresService).execute(req.user.id)
    }

    @Get('/agendamentos')
    public async findAllAgendamentos(
        @Req() req: Request,
        @QueryParam("month") month: number,
        @QueryParam("year") year: number,
        @QueryParam("day") day: number): Promise<Agendamento[]> {
            // TESTAR O CLASS TO CLASS QND EXISTE DADOS
        return container.resolve(ListAgendamentosPrestador).execute({
            provider_id: req.user.id,
            day,
            month,
            year
        })
    }
}