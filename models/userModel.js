class User {
    constructor(id, username, email, password, role = 'user', createdAt = new Date()) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password // En producción debería estar hasheado
        this.role = role // 'admin' o 'user'
        this.createdAt = createdAt
        this.lastLogin = null
    }

    isAdmin() {
        return this.role === 'admin'
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt,
            lastLogin: this.lastLogin
        }
    }
}

export default User 