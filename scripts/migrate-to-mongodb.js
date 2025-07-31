import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/database.js';
import User from '../models/userModel.js';
import Hero from '../models/heroModel.js';
import Pet from '../models/petModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateData() {
    try {
        console.log('🔄 Iniciando migración a MongoDB...');
        
        // Conectar a MongoDB
        await connectDB();
        
        // Migrar usuarios
        console.log('📦 Migrando usuarios...');
        const usersPath = path.join(__dirname, '../data/users.json');
        if (await fs.pathExists(usersPath)) {
            const usersData = await fs.readJson(usersPath);
            for (const userData of usersData) {
                const existingUser = await User.findOne({ username: userData.username });
                if (!existingUser) {
                    const newUser = new User({
                        username: userData.username,
                        email: userData.email,
                        password: userData.password,
                        role: userData.role,
                        lastLogin: userData.lastLogin
                    });
                    await newUser.save();
                    console.log(`✅ Usuario migrado: ${userData.username}`);
                }
            }
        }
        
        // Migrar héroes
        console.log('🦸 Migrando héroes...');
        const heroesPath = path.join(__dirname, '../data/superheroes.json');
        if (await fs.pathExists(heroesPath)) {
            const heroesData = await fs.readJson(heroesPath);
            for (const heroData of heroesData) {
                const existingHero = await Hero.findOne({ name: heroData.name });
                if (!existingHero) {
                    const newHero = new Hero({
                        name: heroData.name,
                        alias: heroData.alias,
                        city: heroData.city,
                        team: heroData.team
                    });
                    await newHero.save();
                    console.log(`✅ Héroe migrado: ${heroData.name}`);
                }
            }
        }
        
        // Migrar mascotas
        console.log('🐾 Migrando mascotas...');
        const petsPath = path.join(__dirname, '../data/pets.json');
        if (await fs.pathExists(petsPath)) {
            const petsData = await fs.readJson(petsPath);
            for (const petData of petsData) {
                // Buscar el usuario correspondiente
                const user = await User.findOne({ username: petData.userId });
                if (user) {
                    const existingPet = await Pet.findOne({ 
                        name: petData.name, 
                        userId: user._id 
                    });
                    if (!existingPet) {
                        const newPet = new Pet({
                            userId: user._id,
                            name: petData.name,
                            type: petData.type,
                            sprite: petData.sprite,
                            energy: petData.energy,
                            sleep: petData.sleep,
                            fun: petData.fun
                        });
                        await newPet.save();
                        console.log(`✅ Mascota migrada: ${petData.name}`);
                    }
                }
            }
        }
        
        console.log('🎉 ¡Migración completada exitosamente!');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error);
        process.exit(1);
    }
}

migrateData(); 