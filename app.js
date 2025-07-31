import express from 'express'
import heroController from './controllers/heroController.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()

app.use(express.json())
app.use('/api', heroController)

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Superhéroes',
    version: '1.0.0',
    description: 'Documentación de la API de superhéroes',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
    console.log(`API disponible en: http://localhost:${PORT}/api`)
    console.log(`Swagger disponible en: http://localhost:${PORT}/api-docs`)
}) 