import heroRepository from '../repositories/heroRepository.js'

async function getAllHeroes() {
    return await heroRepository.getHeroes()
}

async function addHero(heroData) {
    if (!heroData.name || !heroData.alias) {
        throw new Error("El héroe debe tener un nombre y un alias.")
    }

    return await heroRepository.createHero(heroData)
}

async function updateHero(id, updatedHero) {
    return await heroRepository.updateHero(id, updatedHero)
}

async function deleteHero(id) {
    return await heroRepository.deleteHero(id)
}

async function findHeroesByCity(city) {
    return await heroRepository.findHeroesByCity(city)
}

async function faceVillain(heroId, villain) {
    const hero = await heroRepository.getHeroById(heroId)
    if (!hero) {
        throw new Error('Héroe no encontrado')
    }
    return `${hero.alias} enfrenta a ${villain}`
}

export default {
    getAllHeroes,
    addHero,
    updateHero,
    deleteHero,
    findHeroesByCity,
    faceVillain
} 