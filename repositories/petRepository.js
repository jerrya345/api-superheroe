import Pet from '../models/petModel.js';

async function getPets() {
    try {
        const pets = await Pet.find({}).populate('userId', 'username email');
        return pets;
    } catch (error) {
        console.error('Error reading pets:', error);
        return [];
    }
}

async function getPetsByUserId(userId) {
    try {
        return await Pet.find({ userId }).populate('userId', 'username email');
    } catch (error) {
        console.error('Error finding pets by user id:', error);
        return [];
    }
}

async function getPetById(petId) {
    try {
        return await Pet.findById(petId).populate('userId', 'username email');
    } catch (error) {
        console.error('Error finding pet by id:', error);
        return null;
    }
}

async function createPet(petData) {
    try {
        const newPet = new Pet(petData);
        return await newPet.save();
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
}

async function updatePet(petId, updates) {
    try {
        return await Pet.findByIdAndUpdate(petId, updates, { new: true });
    } catch (error) {
        console.error('Error updating pet:', error);
        throw error;
    }
}

async function deletePet(petId) {
    try {
        return await Pet.findByIdAndDelete(petId);
    } catch (error) {
        console.error('Error deleting pet:', error);
        throw error;
    }
}

async function updatePetStats(petId, energy, sleep, fun) {
    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new Error('Pet not found');
        }
        return await pet.updateStats(energy, sleep, fun);
    } catch (error) {
        console.error('Error updating pet stats:', error);
        throw error;
    }
}

export default {
    getPets,
    getPetsByUserId,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    updatePetStats
}; 