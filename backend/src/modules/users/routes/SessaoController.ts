import AutenticacaoService from '../services/AutenticacaoService'
import { container } from 'tsyringe'
import { Controller, Post, Body } from 'routing-controllers'
import Usuario from '../typeorm/model/Usuario'

interface SessaoBody {
    email: string
    password: string
}

interface SessaoOutput {
    user: Usuario
    token: string
}

@Controller('/sessao')
export default class SessaoController {
    
    @Post()
    public async createSessao(@Body() data: SessaoBody): Promise<SessaoOutput> {
        const { email, password } = data

        const service = container.resolve(AutenticacaoService)
        const { user, token } = await service.execute({ email, password })  
        return { user, token }
    }
}