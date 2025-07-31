import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['dog', 'cat', 'bird', 'rabbit'],
    required: true
  },
  sprite: {
    type: String,
    required: true
  },
  energy: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  sleep: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  fun: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Método para actualizar estadísticas
petSchema.methods.updateStats = function(energy, sleep, fun) {
  this.energy = Math.max(0, Math.min(100, energy));
  this.sleep = Math.max(0, Math.min(100, sleep));
  this.fun = Math.max(0, Math.min(100, fun));
  this.lastActivity = new Date();
  return this.save();
};

// Método para convertir a JSON
petSchema.methods.toJSON = function() {
  const pet = this.toObject();
  return pet;
};

const Pet = mongoose.model('Pet', petSchema);

export default Pet; 