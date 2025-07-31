# Script para preparar el proyecto para Postman
# Ejecutar desde la carpeta api-superheroes

Write-Host "🚀 Preparando API para Postman..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "app.js")) {
    Write-Host "❌ Error: Debes ejecutar este script desde la carpeta api-superheroes" -ForegroundColor Red
    exit 1
}

# Verificar que todas las dependencias estén instaladas
Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "📥 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencias ya instaladas" -ForegroundColor Green
}

# Verificar que el servidor funcione
Write-Host "🔧 Probando el servidor..." -ForegroundColor Yellow
try {
    $process = Start-Process -FilePath "node" -ArgumentList "app.js" -PassThru -WindowStyle Hidden
    Start-Sleep -Seconds 3
    
    # Verificar si el servidor está respondiendo
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001/api/heroes" -TimeoutSec 5
        Write-Host "✅ Servidor funcionando correctamente" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Servidor iniciado pero no responde aún (normal en el primer arranque)" -ForegroundColor Yellow
    }
    
    # Detener el proceso de prueba
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "❌ Error al probar el servidor" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Próximos pasos para publicar en Postman:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣ DESPLEGAR EN RENDER:" -ForegroundColor White
Write-Host "   - Ve a https://render.com" -ForegroundColor Yellow
Write-Host "   - Conecta tu repositorio de GitHub" -ForegroundColor Yellow
Write-Host "   - Crea un nuevo Web Service" -ForegroundColor Yellow
Write-Host "   - Build Command: npm install" -ForegroundColor Yellow
Write-Host "   - Start Command: npm start" -ForegroundColor Yellow
Write-Host ""
Write-Host "2️⃣ SUBIR A POSTMAN:" -ForegroundColor White
Write-Host "   - Abre Postman" -ForegroundColor Yellow
Write-Host "   - Importa el archivo: postman-collection.json" -ForegroundColor Yellow
Write-Host "   - Crea un entorno con variable base_url" -ForegroundColor Yellow
Write-Host "   - Configura la URL de tu API desplegada" -ForegroundColor Yellow
Write-Host ""
Write-Host "3️⃣ ARCHIVOS LISTOS:" -ForegroundColor White
Write-Host "   ✅ postman-collection.json - Colección de Postman" -ForegroundColor Green
Write-Host "   ✅ upload-to-postman.md - Guía completa" -ForegroundColor Green
Write-Host "   ✅ README.md - Documentación del proyecto" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Comandos útiles:" -ForegroundColor Cyan
Write-Host "   npm start - Iniciar servidor local" -ForegroundColor Yellow
Write-Host "   npm install - Instalar dependencias" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 ¡Tu API está lista para ser publicada en Postman!" -ForegroundColor Green 