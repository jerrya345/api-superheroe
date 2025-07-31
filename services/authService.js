import userRepository from '../repositories/userRepository.js'

class AuthService {
    async login(username, password) {
        try {
            const user = await userRepository.findUserByUsername(username)
            
            if (!user) {
                throw new Error('Usuario no encontrado')
            }
            
            if (user.password !== password) {
                throw new Error('Contraseña incorrecta')
            }
            
            // Actualizar último login
            await userRepository.updateUserLastLogin(user._id)
            
            return user.toJSON()
        } catch (error) {
            throw error
        }
    }
    
    async register(userData) {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await userRepository.findUserByUsername(userData.username)
            if (existingUser) {
                throw new Error('El nombre de usuario ya existe')
            }
            
            const existingEmail = await userRepository.findUserByEmail(userData.email)
            if (existingEmail) {
                throw new Error('El email ya está registrado')
            }
            
            // Crear nuevo usuario
            const newUser = await userRepository.createUser({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                role: 'user'
            })
            
            return newUser.toJSON()
        } catch (error) {
            throw error
        }
    }
    
    async getAllUsers() {
        try {
            const users = await userRepository.getUsers()
            return users.map(user => user.toJSON())
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService() 