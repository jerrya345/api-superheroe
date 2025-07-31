// Estado de la mascota
let pet = {
    name: 'Luna',
    energy: 100,
    sleep: 0,
    fun: 50,
    sprite: '🐕'
};

// API URL
const API_URL = 'https://api-superheroe.onrender.com/api';

// Elementos del DOM
const petSprite = document.getElementById('petSprite');
const petName = document.getElementById('petName');
const energyBar = document.getElementById('energyBar');
const energyValue = document.getElementById('energyValue');
const sleepBar = document.getElementById('sleepBar');
const sleepValue = document.getElementById('sleepValue');
const funBar = document.getElementById('funBar');
const funValue = document.getElementById('funValue');
const messageLog = document.getElementById('messageLog');
const apiStatus = document.getElementById('apiStatus');

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updatePetDisplay();
    testAPI();
    addMessage('¡Bienvenido! Tu mascota está lista para jugar.', 'info');
});

// Actualizar la visualización de la mascota
function updatePetDisplay() {
    petSprite.textContent = pet.sprite;
    petName.textContent = pet.name;
    
    energyBar.style.width = pet.energy + '%';
    energyValue.textContent = pet.energy + '%';
    
    sleepBar.style.width = pet.sleep + '%';
    sleepValue.textContent = pet.sleep + '%';
    
    funBar.style.width = pet.fun + '%';
    funValue.textContent = pet.fun + '%';
}

// Agregar mensaje al log
function addMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    messageLog.appendChild(message);
    messageLog.scrollTop = messageLog.scrollHeight;
}

// Actividades de la mascota
function play() {
    if (pet.energy < 20) {
        addMessage('😴 Tu mascota está muy cansada para jugar. Deja que duerma un poco.', 'warning');
        return;
    }
    
    pet.energy = Math.max(0, pet.energy - 15);
    pet.fun = Math.min(100, pet.fun + 25);
    pet.sleep = Math.min(100, pet.sleep + 5);
    
    pet.sprite = '🎾';
    updatePetDisplay();
    addMessage('🎾 ¡Tu mascota está jugando! Se divierte mucho contigo.', 'success');
    
    setTimeout(() => {
        pet.sprite = '🐕';
        updatePetDisplay();
    }, 2000);
}

function sleep() {
    if (pet.sleep >= 100) {
        addMessage('😴 Tu mascota ya está completamente descansada.', 'info');
        return;
    }
    
    pet.sleep = Math.min(100, pet.sleep + 30);
    pet.energy = Math.min(100, pet.energy + 20);
    pet.fun = Math.max(0, pet.fun - 10);
    
    pet.sprite = '😴';
    updatePetDisplay();
    addMessage('😴 Tu mascota está durmiendo profundamente...', 'info');
    
    setTimeout(() => {
        pet.sprite = '🐕';
        updatePetDisplay();
        addMessage('😊 ¡Tu mascota se despertó renovada!', 'success');
    }, 3000);
}

function eat() {
    if (pet.energy >= 100) {
        addMessage('🍖 Tu mascota no tiene hambre en este momento.', 'info');
        return;
    }
    
    pet.energy = Math.min(100, pet.energy + 25);
    pet.fun = Math.min(100, pet.fun + 10);
    
    pet.sprite = '🍖';
    updatePetDisplay();
    addMessage('🍖 Tu mascota está comiendo deliciosamente.', 'success');
    
    setTimeout(() => {
        pet.sprite = '🐕';
        updatePetDisplay();
    }, 2000);
}

function walk() {
    if (pet.energy < 30) {
        addMessage('😴 Tu mascota está muy cansada para pasear.', 'warning');
        return;
    }
    
    pet.energy = Math.max(0, pet.energy - 20);
    pet.fun = Math.min(100, pet.fun + 15);
    pet.sleep = Math.min(100, pet.sleep + 10);
    
    pet.sprite = '🚶‍♂️';
    updatePetDisplay();
    addMessage('🚶‍♂️ Tu mascota está paseando por el parque.', 'success');
    
    setTimeout(() => {
        pet.sprite = '🐕';
        updatePetDisplay();
    }, 2500);
}

function train() {
    if (pet.energy < 40) {
        addMessage('😴 Tu mascota necesita más energía para entrenar.', 'warning');
        return;
    }
    
    pet.energy = Math.max(0, pet.energy - 25);
    pet.fun = Math.min(100, pet.fun + 20);
    pet.sleep = Math.min(100, pet.sleep + 15);
    
    pet.sprite = '🎯';
    updatePetDisplay();
    addMessage('🎯 Tu mascota está entrenando nuevos trucos.', 'success');
    
    setTimeout(() => {
        pet.sprite = '🐕';
        updatePetDisplay();
    }, 3000);
}

function cuddle() {
    pet.fun = Math.min(100, pet.fun + 15);
    pet.sleep = Math.min(100, pet.sleep + 5);
    
    pet.sprite = '🤗';
    updatePetDisplay();
    addMessage('🤗 Tu mascota está recibiendo muchos abrazos y amor.', 'success');
    
    setTimeout(() => {
        pet.sprite = '🐕';
        updatePetDisplay();
    }, 1500);
}

// Probar conexión con la API
async function testAPI() {
    try {
        apiStatus.textContent = 'Conectando...';
        apiStatus.className = 'status-indicator connecting';
        
        const response = await fetch(`${API_URL}/heroes`);
        
        if (response.ok) {
            const data = await response.json();
            apiStatus.textContent = `✅ Conectado - ${data.length} superhéroes disponibles`;
            apiStatus.className = 'status-indicator connected';
            addMessage(`✅ API conectada exitosamente. ${data.length} superhéroes cargados.`, 'success');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        apiStatus.textContent = '❌ Error de conexión';
        apiStatus.className = 'status-indicator disconnected';
        addMessage(`❌ Error conectando con la API: ${error.message}`, 'warning');
    }
}

// Click en la mascota
petSprite.addEventListener('click', function() {
    pet.fun = Math.min(100, pet.fun + 5);
    updatePetDisplay();
    addMessage('🐕 ¡Tu mascota está feliz de que la acaricies!', 'success');
});

// Degradación natural de stats
setInterval(() => {
    pet.energy = Math.max(0, pet.energy - 1);
    pet.fun = Math.max(0, pet.fun - 0.5);
    pet.sleep = Math.min(100, pet.sleep + 0.5);
    updatePetDisplay();
}, 30000); // Cada 30 segundos

// Mensajes aleatorios
const randomMessages = [
    '🐕 Tu mascota te mira con amor.',
    '😊 Tu mascota está muy feliz contigo.',
    '🎾 Tu mascota quiere jugar más.',
    '🍖 Tu mascota tiene un poco de hambre.',
    '😴 Tu mascota está un poco cansada.'
];

setInterval(() => {
    if (Math.random() < 0.3) { // 30% de probabilidad
        const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        addMessage(message, 'info');
    }
}, 60000); // Cada minuto 