import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import tableModel from './models/tableModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const checkTables = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MongoDB URI not found in environment variables');
      process.exit(1);
    }
    
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const tables = await tableModel.find().sort({ tableNo: 1 });
    
    console.log('\n📊 Current Table Status:');
    console.log('========================');
    
    const statusCount = { available: 0, reserved: 0, occupied: 0 };
    
    tables.forEach(table => {
      const emoji = table.status === 'available' ? '✅' : 
                    table.status === 'reserved' ? '🟠' : '🔴';
      console.log(`${emoji} Table ${table.tableNo}: ${table.status}`);
      statusCount[table.status]++;
    });
    
    console.log('\n📈 Summary:');
    console.log(`Available: ${statusCount.available}`);
    console.log(`Reserved: ${statusCount.reserved}`);
    console.log(`Occupied: ${statusCount.occupied}`);
    console.log(`Total: ${tables.length}`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkTables();
