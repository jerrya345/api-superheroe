# API de Superhéroes 🦸‍♂️

Una API RESTful para gestionar superhéroes construida con Node.js, Express y Clean Architecture.

## 🚀 Características

- **Clean Architecture**: Separación clara de responsabilidades
- **Documentación automática**: Swagger UI integrado
- **Validación de datos**: Express-validator para validaciones
- **Estructura modular**: Controllers, Services, Repositories y Models

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio-url>
cd api-superheroes
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación:
```bash
npm start
```

## 🌐 Endpoints

La API estará disponible en `http://localhost:3001/api`

### Documentación
- **Swagger UI**: `http://localhost:3001/api-docs`

### Endpoints disponibles:
- `GET /api/heroes` - Obtener todos los superhéroes
- `GET /api/heroes/:id` - Obtener un superhéroe por ID
- `POST /api/heroes` - Crear un nuevo superhéroe
- `PUT /api/heroes/:id` - Actualizar un superhéroe
- `DELETE /api/heroes/:id` - Eliminar un superhéroe

## 🏗️ Estructura del Proyecto

```
api-superheroes/
├── controllers/     # Controladores de la API
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos
├── models/          # Modelos de datos
├── data/           # Datos JSON
├── app.js          # Punto de entrada
└── package.json    # Configuración del proyecto
```

## 🧪 Uso

### Ejemplo de creación de un superhéroe:

```bash
curl -X POST http://localhost:3001/api/heroes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spider-Man",
    "powers": ["Trepar paredes", "Sentido arácnido"],
    "universe": "Marvel"
  }'
```

## 📝 Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **Swagger**: Documentación automática de la API
- **Express-validator**: Validación de datos
- **fs-extra**: Utilidades para manejo de archivos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

**javerage**

---

¡Disfruta usando la API de Superhéroes! 🦸‍♀️ 