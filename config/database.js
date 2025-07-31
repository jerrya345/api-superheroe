import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // URL correcta de MongoDB Atlas
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://gerardoavilesmoreno28:3eDtvChgOqfmrUNj@cluster0.wiekh5r.mongodb.net/api-superheroes?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.log('💡 Asegúrate de tener la URL correcta de MongoDB Atlas');
    process.exit(1);
  }
};

export default connectDB; 