import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import User from '../models/userModel.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '../data/users.json')

async function getUsers() {
    try {
        const data = await fs.readJson(filePath)
        return data.map(user => new User(
            user.id, user.username, user.email, user.password, user.role, user.createdAt
        ))
    } catch (error) {
        console.error('Error reading users:', error)
        return []
    }
}

async function saveUsers(users) {
    try {
        // Convertir usuarios a objetos planos incluyendo la contraseña
        const usersData = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
        }))
        await fs.writeJson(filePath, usersData)
    } catch (error) {
        console.error('Error saving users:', error)
        throw error
    }
}

async function findUserByUsername(username) {
    const users = await getUsers()
    return users.find(user => user.username === username)
}

async function findUserByEmail(email) {
    const users = await getUsers()
    return users.find(user => user.email === email)
}

async function createUser(user) {
    const users = await getUsers()
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    const newUser = new User(newId, user.username, user.email, user.password, user.role)
    
    users.push(newUser)
    await saveUsers(users)
    return newUser
}

async function updateUserLastLogin(userId) {
    const users = await getUsers()
    const userIndex = users.findIndex(user => user.id === userId)
    
    if (userIndex !== -1) {
        users[userIndex].lastLogin = new Date()
        await saveUsers(users)
    }
}

export default {
    getUsers,
    saveUsers,
    findUserByUsername,
    findUserByEmail,
    createUser,
    updateUserLastLogin
} 