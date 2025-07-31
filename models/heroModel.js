import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  alias: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  team: {
    type: String,
    required: true,
    trim: true
  },
  powers: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Hero = mongoose.model('Hero', heroSchema);

export default Hero; 