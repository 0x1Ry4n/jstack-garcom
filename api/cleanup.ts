import mongoose from 'mongoose';

async function cleanup() {
  await mongoose.connect('mongodb://localhost:27017/services');

  await mongoose.connection.db.collection('products').deleteMany({});
  await mongoose.connection.db.collection('categories').deleteMany({});
  await mongoose.connection.db.collection('ingredients').deleteMany({});
  await mongoose.connection.db.collection('orders').deleteMany({});

  console.log('🧹 Coleções limpas!');
  await mongoose.disconnect();
}

cleanup();
