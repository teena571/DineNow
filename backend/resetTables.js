import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tableModel from './models/tableModel.js';

dotenv.config();

const resetTables = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

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
