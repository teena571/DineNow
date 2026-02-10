import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const checkDatabase = async () => {
  try {
    console.log('🔍 Connecting to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'Not found');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const foodsCollection = db.collection('foods');

    // Get all foods
    const allFoods = await foodsCollection.find({}).toArray();
    console.log(`📦 Total items in database: ${allFoods.length}\n`);

    // Group by category
    const byCategory = {};
    allFoods.forEach(item => {
      const cat = item.category || 'Unknown';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(item.name);
    });

    console.log('📊 Items by Category:');
    Object.keys(byCategory).sort().forEach(cat => {
      console.log(`  ${cat}: ${byCategory[cat].length} items`);
      byCategory[cat].forEach(name => console.log(`    - ${name}`));
    });

    // Check for items without _id
    const noId = allFoods.filter(item => !item._id);
    if (noId.length > 0) {
      console.log(`\n⚠️ Found ${noId.length} items without _id`);
    }

    // Check for duplicate names
    const names = {};
    allFoods.forEach(item => {
      if (!names[item.name]) names[item.name] = 0;
      names[item.name]++;
    });
    const duplicates = Object.entries(names).filter(([_, count]) => count > 1);
    if (duplicates.length > 0) {
      console.log('\n⚠️ Duplicate names found:');
      duplicates.forEach(([name, count]) => console.log(`  ${name}: ${count} times`));
    }

    await mongoose.connection.close();
    console.log('\n✅ Database check complete');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
