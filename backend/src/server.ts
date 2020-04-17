import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import './database'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(8080, () => {
    console.log(`🚀 server running ate port 8080`)
})

