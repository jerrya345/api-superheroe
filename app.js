import express from 'express'
import heroController from './controllers/heroController.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'

console.log('🚀 Iniciando servidor...')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', heroController)

console.log('✅ Middleware configurado')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Superhéroes',
    version: '1.0.0',
    description: 'Documentación de la API de superhéroes',
  },
  servers: [
    {
      url: 'https://api-superheroe.onrender.com/api',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

console.log('✅ Swagger configurado')

const PORT = process.env.PORT || 3001

console.log(`📡 Puerto configurado: ${PORT}`)

// Manejo de errores global
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
    process.exit(1)
})

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`)
    console.log(`✅ API disponible en: http://localhost:${PORT}/api`)
    console.log(`✅ Swagger disponible en: http://localhost:${PORT}/api-docs`)
    console.log('🎉 ¡Servidor iniciado exitosamente!')
}) 