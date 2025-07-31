# Script para subir el proyecto a GitHub
# Ejecutar desde la carpeta api-superheroes

Write-Host "🚀 Preparando proyecto para subir a GitHub..." -ForegroundColor Green

# Verificar si git está instalado
try {
    git --version | Out-Null
    Write-Host "✅ Git está instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado. Por favor instálalo primero." -ForegroundColor Red
    exit 1
}

# Inicializar repositorio git si no existe
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositorio Git inicializado" -ForegroundColor Green
}

# Agregar todos los archivos
Write-Host "📦 Agregando archivos al staging area..." -ForegroundColor Yellow
git add .

# Hacer commit inicial
Write-Host "💾 Haciendo commit inicial..." -ForegroundColor Yellow
git commit -m "🎉 Commit inicial: API de Superhéroes con Clean Architecture

- Implementación de Clean Architecture
- Documentación con Swagger
- Endpoints CRUD completos
- Validación de datos
- Estructura modular"

Write-Host "✅ Commit realizado exitosamente" -ForegroundColor Green

Write-Host ""
Write-Host "🎯 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a GitHub.com y crea un nuevo repositorio" -ForegroundColor White
Write-Host "2. Copia la URL del repositorio (ej: https://github.com/tu-usuario/api-superheroes.git)" -ForegroundColor White
Write-Host "3. Ejecuta estos comandos:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin <URL-DEL-REPOSITORIO>" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "¡Listo! Tu proyecto estará en GitHub 🚀" -ForegroundColor Green 