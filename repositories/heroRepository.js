import Hero from '../models/heroModel.js';

async function getHeroes() {
    try {
        const heroes = await Hero.find({});
        return heroes;
    } catch (error) {
        console.error('Error reading heroes:', error);
        return [];
    }
}

async function getHeroById(id) {
    try {
        return await Hero.findById(id);
    } catch (error) {
        console.error('Error finding hero by id:', error);
        return null;
    }
}

async function createHero(heroData) {
    try {
        const newHero = new Hero(heroData);
        return await newHero.save();
    } catch (error) {
        console.error('Error creating hero:', error);
        throw error;
    }
}

async function updateHero(id, updateData) {
    try {
        return await Hero.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        console.error('Error updating hero:', error);
        throw error;
    }
}

async function deleteHero(id) {
    try {
        return await Hero.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting hero:', error);
        throw error;
    }
}

async function findHeroesByTeam(team) {
    try {
        return await Hero.find({ team });
    } catch (error) {
        console.error('Error finding heroes by team:', error);
        return [];
    }
}

async function findHeroesByCity(city) {
    try {
        return await Hero.find({ city });
    } catch (error) {
        console.error('Error finding heroes by city:', error);
        return [];
    }
}

export default {
    getHeroes,
    getHeroById,
    createHero,
    updateHero,
    deleteHero,
    findHeroesByTeam,
    findHeroesByCity
}; 