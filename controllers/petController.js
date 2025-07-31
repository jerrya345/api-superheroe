import express from 'express'
import { check, validationResult } from 'express-validator'
import petService from '../services/petService.js'

const router = express.Router()

// Obtener mascotas de un usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        const pets = await petService.getPetsByUserId(userId)
        res.json(pets)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Obtener una mascota específica
router.get('/:petId', async (req, res) => {
    try {
        const petId = parseInt(req.params.petId)
        const pet = await petService.getPetById(petId)
        res.json(pet)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

// Crear nueva mascota
router.post('/', [
    check('userId').isInt().withMessage('El ID de usuario es requerido'),
    check('name').not().isEmpty().withMessage('El nombre de la mascota es requerido'),
    check('type').isIn(['dog', 'cat', 'bird', 'rabbit']).withMessage('Tipo de mascota inválido')
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { userId, name, type } = req.body
        const pet = await petService.createPet({ userId, name, type })
        
        res.status(201).json(pet)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Actualizar stats de mascota
router.put('/:petId/stats', [
    check('energy').isInt({ min: 0, max: 100 }).withMessage('Energía debe estar entre 0 y 100'),
    check('sleep').isInt({ min: 0, max: 100 }).withMessage('Sueño debe estar entre 0 y 100'),
    check('fun').isInt({ min: 0, max: 100 }).withMessage('Diversión debe estar entre 0 y 100')
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const petId = parseInt(req.params.petId)
        const { energy, sleep, fun } = req.body
        const pet = await petService.updatePetStats(petId, energy, sleep, fun)
        
        res.json(pet)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

// Eliminar mascota
router.delete('/:petId', async (req, res) => {
    try {
        const petId = parseInt(req.params.petId)
        const result = await petService.deletePet(petId)
        res.json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

// Obtener todas las mascotas (solo admin)
router.get('/', async (req, res) => {
    try {
        const pets = await petService.getAllPets()
        res.json(pets)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router 