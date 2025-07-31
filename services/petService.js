import petRepository from '../repositories/petRepository.js'

class PetService {
    async getPetsByUserId(userId) {
        try {
            const pets = await petRepository.getPetsByUserId(userId)
            return pets.map(pet => pet.toJSON())
        } catch (error) {
            throw error
        }
    }
    
    async getPetById(petId) {
        try {
            const pet = await petRepository.getPetById(petId)
            if (!pet) {
                throw new Error('Mascota no encontrada')
            }
            return pet.toJSON()
        } catch (error) {
            throw error
        }
    }
    
    async createPet(petData) {
        try {
            const petTypes = {
                dog: '🐕',
                cat: '🐱',
                bird: '🐦',
                rabbit: '🐰'
            }
            
            const sprite = petTypes[petData.type] || '🐕'
            
            const newPet = await petRepository.createPet({
                userId: petData.userId,
                name: petData.name,
                type: petData.type,
                sprite: sprite
            })
            
            return newPet.toJSON()
        } catch (error) {
            throw error
        }
    }
    
    async updatePetStats(petId, energy, sleep, fun) {
        try {
            const pet = await petRepository.getPetById(petId)
            if (!pet) {
                throw new Error('Mascota no encontrada')
            }
            
            pet.updateStats(energy, sleep, fun)
            const updatedPet = await petRepository.updatePet(petId, {
                energy: pet.energy,
                sleep: pet.sleep,
                fun: pet.fun,
                lastActivity: pet.lastActivity
            })
            
            return updatedPet.toJSON()
        } catch (error) {
            throw error
        }
    }
    
    async deletePet(petId) {
        try {
            await petRepository.deletePet(petId)
            return { message: 'Mascota eliminada exitosamente' }
        } catch (error) {
            throw error
        }
    }
    
    async getAllPets() {
        try {
            const pets = await petRepository.getPets()
            return pets.map(pet => pet.toJSON())
        } catch (error) {
            throw error
        }
    }
}

export default new PetService() 