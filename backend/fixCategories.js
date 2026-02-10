/**
 * Fix Category Names in Database
 * Makes all categories match the frontend menu_list
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'DineNow';

async function fixCategories() {
    let client;
    
    try {
        console.log('🔧 Fixing category names...\n');
        
        client = new MongoClient(MONGO_URI);
        await client.connect();
        
        const db = client.db(DB_NAME);
        const foodsCollection = db.collection('foods');
        
        // Fix: Salad → Salads
        const salad = await foodsCollection.updateMany(
            { category: 'Salad' },
            { $set: { category: 'Salads' } }
        );
        console.log(`✅ Fixed "Salad" → "Salads": ${salad.modifiedCount} items`);
        
        // Fix: Sandwich → Sandwiches
        const sandwich = await foodsCollection.updateMany(
            { category: 'Sandwich' },
            { $set: { category: 'Sandwiches' } }
        );
        console.log(`✅ Fixed "Sandwich" → "Sandwiches": ${sandwich.modifiedCount} items`);
        
        // Fix: Cake → Cakes
        const cake = await foodsCollection.updateMany(
            { category: 'Cake' },
            { $set: { category: 'Cakes' } }
        );
        console.log(`✅ Fixed "Cake" → "Cakes": ${cake.modifiedCount} items`);
        
        // Verify
        console.log('\n📊 Updated Categories:\n');
        const categories = await foodsCollection.distinct('category');
        for (const category of categories) {
            const count = await foodsCollection.countDocuments({ category });
            console.log(`  ${category}: ${count} items`);
        }
        
        console.log('\n🎉 Categories fixed successfully!');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

fixCategories();
