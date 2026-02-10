/**
 * Check Food Data Categories
 * This script checks what categories exist in the database
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'DineNow';

async function checkFoodData() {
    let client;
    
    try {
        console.log('🔍 Connecting to MongoDB...\n');
        
        client = new MongoClient(MONGO_URI);
        await client.connect();
        
        const db = client.db(DB_NAME);
        const foodsCollection = db.collection('foods');
        
        // Get all unique categories
        const categories = await foodsCollection.distinct('category');
        console.log('📊 Categories in Database:', categories);
        console.log('📊 Total Categories:', categories.length);
        
        // Count items per category
        console.log('\n📦 Items per Category:\n');
        for (const category of categories) {
            const count = await foodsCollection.countDocuments({ category });
            const items = await foodsCollection.find({ category }).toArray();
            console.log(`${category}: ${count} items`);
            items.forEach(item => {
                console.log(`  - ${item.name} (ID: ${item._id})`);
            });
            console.log('');
        }
        
        // Check for "Salads" specifically
        console.log('🔍 Checking "Salads" category specifically:\n');
        const salads = await foodsCollection.find({ category: 'Salads' }).toArray();
        console.log(`Found ${salads.length} salad items:`);
        salads.forEach(item => {
            console.log(`  ✅ ${item.name} - Category: "${item.category}"`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

checkFoodData();
