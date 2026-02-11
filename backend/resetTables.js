import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import tableModel from './models/tableModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const resetTables = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MongoDB URI not found in environment variables');
      process.exit(1);
    }
    
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Reset all tables to available
    const result = await tableModel.updateMany({}, { status: 'available' });
    
    console.log(`✅ Reset ${result.modifiedCount} tables to available status`);
    
    // Verify
    const tables = await tableModel.find().sort({ tableNo: 1 });
    console.log(`\n📊 Current status: ${tables.length} tables, all available`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetTables();
