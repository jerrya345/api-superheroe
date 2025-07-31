import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import Pet from '../models/petModel.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '../data/pets.json')

async function getPets() {
    try {
        const data = await fs.readJson(filePath)
        return data.map(pet => new Pet(
            pet.id, pet.userId, pet.name, pet.type, pet.sprite, 
            pet.energy, pet.sleep, pet.fun, pet.createdAt
        ))
    } catch (error) {
        console.error('Error reading pets:', error)
        return []
    }
}

async function savePets(pets) {
    try {
        await fs.writeJson(filePath, pets)
    } catch (error) {
        console.error('Error saving pets:', error)
        throw error
    }
}

async function getPetsByUserId(userId) {
    const pets = await getPets()
    return pets.filter(pet => pet.userId === userId)
}

async function getPetById(petId) {
    const pets = await getPets()
    return pets.find(pet => pet.id === petId)
}

async function createPet(pet) {
    const pets = await getPets()
    const newId = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1
    const newPet = new Pet(newId, pet.userId, pet.name, pet.type, pet.sprite)
    
    pets.push(newPet)
    await savePets(pets)
    return newPet
}

async function updatePet(petId, updates) {
    const pets = await getPets()
    const petIndex = pets.findIndex(pet => pet.id === petId)
    
    if (petIndex !== -1) {
        pets[petIndex] = { ...pets[petIndex], ...updates }
        await savePets(pets)
        return pets[petIndex]
    }
    
    throw new Error('Pet not found')
}

async function deletePet(petId) {
    const pets = await getPets()
    const filteredPets = pets.filter(pet => pet.id !== petId)
    await savePets(filteredPets)
}

export default {
    getPets,
    savePets,
    getPetsByUserId,
    getPetById,
    createPet,
    updatePet,
    deletePet
} 