// Estado de la mascota
let pet = {
    name: '',
    energy: 100,
    sleep: 0,
    fun: 50,
    sprite: '🐕'
};

// API URL
const API_URL = 'https://api-superheroe.onrender.com/api';

// Emojis por tipo de mascota
const petEmojis = {
    dog: '🐕',
    cat: '🐱',
    bird: '🐦',
    rabbit: '🐰'
};

// Emojis de actividades
const activityEmojis = {
    play: '🎾',
    sleep: '😴',
    eat: '🍖',
    walk: '🚶‍♂️',
    train: '🎯',
    cuddle: '🤗'
};

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
    // Cargar mascota seleccionada si existe
    if (window.currentPet) {
        pet = {
            name: window.currentPet.name,
            energy: window.currentPet.energy,
            sleep: window.currentPet.sleep,
            fun: window.currentPet.fun,
            sprite: window.currentPet.sprite
        };
        addMessage(`¡Bienvenido! ${pet.name} está lista para jugar.`, 'info');
    } else {
        addMessage('¡Bienvenido! Tu mascota está lista para jugar.', 'info');
    }
    
    updatePetDisplay();
    testAPI();
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
    
    // Guardar cambios en la API si hay una mascota seleccionada
    if (window.currentPet) {
        updatePetInAPI();
    }
}

// Actualizar mascota en la API
async function updatePetInAPI() {
    try {
        const response = await fetch(`${API_URL}/pets/${window.currentPet.id}/stats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                energy: pet.energy,
                sleep: pet.sleep,
                fun: pet.fun
            })
        });
        
        if (response.ok) {
            const updatedPet = await response.json();
            // Actualizar la mascota en localStorage
            localStorage.setItem('selectedPet', JSON.stringify(updatedPet));
            window.currentPet = updatedPet;
        }
    } catch (error) {
        console.error('Error actualizando mascota:', error);
    }
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
    
    pet.sprite = activityEmojis.play;
    updatePetDisplay();
    addMessage('🎾 ¡Tu mascota está jugando! Se divierte mucho contigo.', 'success');
    
    setTimeout(() => {
        // Restaurar el emoji original de la mascota
        if (window.currentPet && window.currentPet.type) {
            pet.sprite = petEmojis[window.currentPet.type] || '🐕';
        } else {
            pet.sprite = '🐕';
        }
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
    
    pet.sprite = activityEmojis.sleep;
    updatePetDisplay();
    addMessage('😴 Tu mascota está durmiendo profundamente...', 'info');
    
    setTimeout(() => {
        // Restaurar el emoji original de la mascota
        if (window.currentPet && window.currentPet.type) {
            pet.sprite = petEmojis[window.currentPet.type] || '🐕';
        } else {
            pet.sprite = '🐕';
        }
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
    
    pet.sprite = activityEmojis.eat;
    updatePetDisplay();
    addMessage('🍖 Tu mascota está comiendo deliciosamente.', 'success');
    
    setTimeout(() => {
        // Restaurar el emoji original de la mascota
        if (window.currentPet && window.currentPet.type) {
            pet.sprite = petEmojis[window.currentPet.type] || '🐕';
        } else {
            pet.sprite = '🐕';
        }
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
    
    pet.sprite = activityEmojis.walk;
    updatePetDisplay();
    addMessage('🚶‍♂️ Tu mascota está paseando por el parque.', 'success');
    
    setTimeout(() => {
        // Restaurar el emoji original de la mascota
        if (window.currentPet && window.currentPet.type) {
            pet.sprite = petEmojis[window.currentPet.type] || '🐕';
        } else {
            pet.sprite = '🐕';
        }
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
    
    pet.sprite = activityEmojis.train;
    updatePetDisplay();
    addMessage('🎯 Tu mascota está entrenando nuevos trucos.', 'success');
    
    setTimeout(() => {
        // Restaurar el emoji original de la mascota
        if (window.currentPet && window.currentPet.type) {
            pet.sprite = petEmojis[window.currentPet.type] || '🐕';
        } else {
            pet.sprite = '🐕';
        }
        updatePetDisplay();
    }, 3000);
}

function cuddle() {
    pet.fun = Math.min(100, pet.fun + 15);
    pet.sleep = Math.min(100, pet.sleep + 5);
    
    pet.sprite = activityEmojis.cuddle;
    updatePetDisplay();
    addMessage('🤗 Tu mascota está recibiendo muchos abrazos y amor.', 'success');
    
    setTimeout(() => {
        // Restaurar el emoji original de la mascota
        if (window.currentPet && window.currentPet.type) {
            pet.sprite = petEmojis[window.currentPet.type] || '🐕';
        } else {
            pet.sprite = '🐕';
        }
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
    
    // Usar el emoji correcto de la mascota en el mensaje
    let petEmoji = '🐕';
    if (window.currentPet && window.currentPet.type) {
        petEmoji = petEmojis[window.currentPet.type] || '🐕';
    }
    addMessage(`${petEmoji} ¡Tu mascota está feliz de que la acaricies!`, 'success');
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
    'Tu mascota te mira con amor.',
    'Tu mascota está muy feliz contigo.',
    'Tu mascota quiere jugar más.',
    'Tu mascota tiene un poco de hambre.',
    'Tu mascota está un poco cansada.'
];

setInterval(() => {
    if (Math.random() < 0.3) { // 30% de probabilidad
        const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        // Usar el emoji correcto de la mascota
        let petEmoji = '🐕';
        if (window.currentPet && window.currentPet.type) {
            petEmoji = petEmojis[window.currentPet.type] || '🐕';
        }
        
        addMessage(`${petEmoji} ${message}`, 'info');
    }
}, 60000); // Cada minuto 