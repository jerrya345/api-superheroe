// Script para probar la aplicación localmente
import express from 'express'
import heroController from './controllers/heroController.js'
import authController from './controllers/authController.js'
import petController from './controllers/petController.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import connectDB from './config/database.js'

console.log('🚀 Iniciando prueba local...')

try {
    const app = express()
    
    console.log('✅ Express inicializado')
    
    app.use(express.json())
    app.use('/api', heroController)
    app.use('/api/auth', authController)
    app.use('/api/pets', petController)
    
    console.log('✅ Middleware configurado')
    
    // Conectar a MongoDB
    await connectDB()
    
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
    
    console.log('✅ Swagger configurado')
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
    const PORT = 3001
    
    app.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en el puerto ${PORT}`)
        console.log(`✅ API disponible en: http://localhost:${PORT}/api`)
        console.log(`✅ Swagger disponible en: http://localhost:${PORT}/api-docs`)
        console.log('🎉 ¡Prueba local exitosa!')
        process.exit(0)
    })
    
} catch (error) {
    console.error('❌ Error en prueba local:', error)
    process.exit(1)
} 