import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const fixIds = async () => {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const foodsCollection = db.collection('foods');

    // Get all foods
    const allFoods = await foodsCollection.find({}).toArray();
    console.log(`📦 Total items: ${allFoods.length}`);

    // Check for items without _id
    const noId = allFoods.filter(item => !item._id);
    console.log(`⚠️ Items without _id: ${noId.length}`);

    if (noId.length > 0) {
      console.log('\n🔧 Fixing items without _id...');
      for (const item of noId) {
        await foodsCollection.deleteOne({ name: item.name });
        await foodsCollection.insertOne(item);
      }
      console.log('✅ Fixed all items');
    } else {
      console.log('✅ All items have proper _id');
    }

    await mongoose.connection.close();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

fixIds();
