import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { routes, registerRoutes } from './routes'
import uploadConfig from '@config/upload'
import '@shared/infra/database'
import AppError from '@shared/errors/AppError'
import cors from 'cors'
import '@shared/container'
import { useExpressServer } from 'routing-controllers'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
useExpressServer(app, {
    controllers: registerRoutes()
})

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log('ERROR EXPRESS')
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(8080, () => {
    console.log(`🚀 server running ate port 8080`)
})

