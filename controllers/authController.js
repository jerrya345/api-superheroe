import express from 'express'
import { check, validationResult } from 'express-validator'
import authService from '../services/authService.js'

const router = express.Router()

// Login
router.post('/login', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('password').not().isEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password } = req.body
        const user = await authService.login(username, password)
        
        res.json({
            success: true,
            message: 'Login exitoso',
            user: user
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
})

// Registro
router.post('/register', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('email').isEmail().withMessage('El email debe ser válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, email, password } = req.body
        const user = await authService.register({ username, email, password })
        
        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

// Obtener todos los usuarios (solo admin)
router.get('/users', async (req, res) => {
    try {
        const users = await authService.getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router 