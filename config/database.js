import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // URL de MongoDB Atlas - necesitarás reemplazar con tu cluster real
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://gerardoavilesmoreno28:3eDtvChgOqfmrUNj@cluster0.xxxxx.mongodb.net/api-superheroes?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.log('💡 Asegúrate de tener la URL correcta de MongoDB Atlas');
    process.exit(1);
  }
};

export default connectDB; 