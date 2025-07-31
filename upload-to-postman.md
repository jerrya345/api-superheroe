# 🚀 Guía para subir tu API a Postman

## 📋 Pasos para publicar tu API en Postman

### 1. Preparar tu API para producción

Antes de subir a Postman, necesitas desplegar tu API en un servidor público. Te recomiendo usar **Render** o **Railway**:

#### Opción A: Render (Gratis)
1. Ve a [render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Crea un nuevo Web Service
4. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: `PORT=3001`

#### Opción B: Railway (Gratis)
1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio de GitHub
3. Railway detectará automáticamente que es una app Node.js

### 2. Crear la colección en Postman

1. **Abre Postman** en tu navegador o descarga la app
2. **Inicia sesión** en tu cuenta de Postman
3. **Crea una nueva colección**:
   - Click en "Collections" → "New Collection"
   - Nombre: "API Superhéroes"
   - Descripción: "API RESTful para gestionar superhéroes con Clean Architecture"

### 3. Importar la colección

1. **Importa el archivo JSON** que creé:
   - Click en "Import" en Postman
   - Selecciona el archivo `postman-collection.json`
   - La colección se importará automáticamente

### 4. Configurar variables de entorno

1. **Crea un entorno**:
   - Click en "Environments" → "New Environment"
   - Nombre: "API Superhéroes - Production"
   - Variable: `base_url`
   - Valor: `https://tu-api-en-render.onrender.com` (o tu URL de Railway)

2. **Selecciona el entorno** en el dropdown superior derecho

### 5. Publicar la colección

1. **Abre tu colección** "API Superhéroes"
2. **Click en los 3 puntos** → "Share"
3. **Selecciona "Public"** para hacerla pública
4. **Agrega una descripción**:
   ```
   🦸‍♂️ API de Superhéroes con Clean Architecture
   
   Una API RESTful completa para gestionar superhéroes construida con Node.js, Express y Clean Architecture.
   
   Características:
   - ✅ Clean Architecture
   - ✅ Documentación con Swagger
   - ✅ Validación de datos
   - ✅ Endpoints CRUD completos
   - ✅ Búsqueda por ciudad
   - ✅ Simulación de enfrentamientos
   
   Tecnologías: Node.js, Express, Swagger, Express-validator
   ```

### 6. Agregar documentación

1. **En la colección**, agrega una descripción detallada:
   ```
   ## 🚀 API de Superhéroes
   
   ### Endpoints disponibles:
   
   #### GET /api/heroes
   Obtiene todos los superhéroes
   
   #### GET /api/heroes/:id
   Obtiene un superhéroe específico
   
   #### POST /api/heroes
   Crea un nuevo superhéroe
   Body: {
     "name": "Spider-Man",
     "alias": "Peter Parker",
     "powers": ["Trepar paredes", "Sentido arácnido"],
     "universe": "Marvel",
     "city": "Nueva York"
   }
   
   #### PUT /api/heroes/:id
   Actualiza un superhéroe existente
   
   #### DELETE /api/heroes/:id
   Elimina un superhéroe
   
   #### GET /api/heroes/city/:city
   Busca superhéroes por ciudad
   
   #### POST /api/heroes/:id/enfrentar
   Simula enfrentamiento con villano
   Body: { "villain": "El Joker" }
   
   ### Documentación Swagger
   Visita: https://tu-api-en-render.onrender.com/api-docs
   ```

### 7. Compartir tu API

Una vez publicada, puedes compartir el enlace de tu colección pública con cualquiera.

## 🎯 URLs importantes

- **Tu API**: `https://tu-api-en-render.onrender.com/api`
- **Documentación Swagger**: `https://tu-api-en-render.onrender.com/api-docs`
- **Colección Postman**: [Enlace que se generará]

## 💡 Tips adicionales

1. **Agrega ejemplos de respuesta** en cada request
2. **Incluye códigos de estado HTTP** en la documentación
3. **Agrega tags** para organizar mejor los endpoints
4. **Crea un workspace** específico para tu API

¡Listo! Tu API estará disponible públicamente en Postman 🚀 