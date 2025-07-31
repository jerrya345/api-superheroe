# 🚀 Guía para conectar GitHub a Render

## 📋 Pasos para subir tu API a GitHub y conectarla a Render

### **Paso 1: Crear repositorio en GitHub**

1. **Ve a GitHub.com** y inicia sesión con tu cuenta `jerrya345`
2. **Click en el botón "+"** en la esquina superior derecha
3. **Selecciona "New repository"**
4. **Configura el repositorio**:
   - **Repository name**: `api-superheroes`
   - **Description**: `API de Superhéroes con Clean Architecture`
   - **Visibility**: Public (o Private si prefieres)
   - **NO marques** "Add a README file" (ya tienes uno)
   - **NO marques** "Add .gitignore" (ya tienes uno)
5. **Click en "Create repository"**

### **Paso 2: Subir tu código a GitHub**

Una vez creado el repositorio, ejecuta estos comandos en tu terminal:

```bash
# Ya ejecutamos estos comandos:
# git init
# git add .
# git commit -m "🎉 Commit inicial: API de Superhéroes con Clean Architecture"
# git remote add origin https://github.com/jerrya345/api-superheroes.git
# git branch -M main

# Ahora solo necesitas hacer push:
git push -u origin main
```

### **Paso 3: Conectar GitHub a Render**

1. **Ve a [render.com](https://render.com)**
2. **Crea una cuenta** o inicia sesión
3. **Click en "New +"** → "Web Service"
4. **Conecta tu repositorio de GitHub**:
   - Click en "Connect a repository"
   - Selecciona tu cuenta de GitHub
   - Busca y selecciona `jerrya345/api-superheroes`
   - Click en "Connect"

### **Paso 4: Configurar el despliegue en Render**

Una vez conectado, configura:

- **Name**: `api-superheroes` (o el nombre que prefieras)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### **Paso 5: Variables de entorno (opcional)**

Si necesitas configurar variables de entorno:
- **Key**: `PORT`
- **Value**: `3001`

### **Paso 6: Desplegar**

1. **Click en "Create Web Service"**
2. **Espera** a que termine el build (puede tomar 2-5 minutos)
3. **Tu API estará disponible** en una URL como: `https://api-superheroes-xxxx.onrender.com`

## 🎯 URLs importantes

Una vez desplegado tendrás:
- **API**: `https://api-superheroes-xxxx.onrender.com/api`
- **Documentación Swagger**: `https://api-superheroes-xxxx.onrender.com/api-docs`

## 💡 Tips importantes

1. **Render es gratis** para proyectos personales
2. **El primer despliegue** puede tardar más tiempo
3. **Los despliegues automáticos** se activan cuando haces push a GitHub
4. **Puedes ver los logs** en tiempo real en Render

## 🔗 Comandos útiles

```bash
# Para hacer cambios y subirlos:
git add .
git commit -m "Descripción de los cambios"
git push

# Para ver el estado de tu repositorio:
git status
git log --oneline
```

¡Listo! Una vez que hagas el push, tu API estará en GitHub y podrás conectarla a Render 🚀 