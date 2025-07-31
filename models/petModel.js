class Pet {
    constructor(id, userId, name, type, sprite, energy = 100, sleep = 0, fun = 50, createdAt = new Date()) {
        this.id = id
        this.userId = userId
        this.name = name
        this.type = type // 'dog', 'cat', 'bird', 'rabbit'
        this.sprite = sprite
        this.energy = energy
        this.sleep = sleep
        this.fun = fun
        this.createdAt = createdAt
        this.lastActivity = new Date()
    }

    updateStats(energy, sleep, fun) {
        this.energy = Math.max(0, Math.min(100, energy))
        this.sleep = Math.max(0, Math.min(100, sleep))
        this.fun = Math.max(0, Math.min(100, fun))
        this.lastActivity = new Date()
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            type: this.type,
            sprite: this.sprite,
            energy: this.energy,
            sleep: this.sleep,
            fun: this.fun,
            createdAt: this.createdAt,
            lastActivity: this.lastActivity
        }
    }
}

export default Pet 