/**
 * Clean Duplicate Food Items
 * Keeps only the correct items from seedFoodData.js
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'DineNow';

// Correct food items (from assets.js)
const correctItems = {
    'Salads': ['Ceaser Salad', 'Italian Salad', 'Spinach Salad', 'Chicken Salad'],
    'Rolls': ['Lasagna Rolls', 'Peri Peri Rolls', 'Chicken Rolls', 'Veg Rolls'],
    'Deserts': ['Ripple Ice Cream', 'Fruit Ice Cream', 'Jar Ice Cream', 'Vanilla Ice Cream'],
    'Sandwiches': ['Chicken Sandwich', 'Vegan Sandwich', 'Grilled Sandwich', 'Italian Sub'],
    'Cakes': ['Cup Cake', 'Vegan Cake', 'Butterscotch Cake', 'Sliced Cake'],
    'Vegetarian': ['Garlic Mushroom', 'Fried Cauliflower', 'Mix Veg Pulao', 'Rice Zucchini'],
    'Pastas': ['Fettuccine Alfredo', 'Tomato Pasta', 'Creamy Pasta', 'Chicken Pasta'],
    'Noodles': ['Buttter Noodles', 'Veg Noodles', 'Somen Noodles', 'Cooked Noodles']
};

async function cleanDuplicates() {
    let client;
    
    try {
        console.log('🧹 Cleaning duplicate items...\n');
        
        client = new MongoClient(MONGO_URI);
        await client.connect();
        
        const db = client.db(DB_NAME);
        const foodsCollection = db.collection('foods');
        
        let totalDeleted = 0;
        
        for (const [category, validNames] of Object.entries(correctItems)) {
            console.log(`\n📦 Processing ${category}...`);
            
            // Get all items in this category
            const allItems = await foodsCollection.find({ category }).toArray();
            console.log(`   Found ${allItems.length} items`);
            
            // Delete items NOT in the valid list
            for (const item of allItems) {
                if (!validNames.includes(item.name)) {
                    await foodsCollection.deleteOne({ _id: item._id });
                    console.log(`   ❌ Deleted: ${item.name}`);
                    totalDeleted++;
                } else {
                    console.log(`   ✅ Kept: ${item.name}`);
                }
            }
            
            // Check for duplicates of valid items
            for (const validName of validNames) {
                const duplicates = await foodsCollection.find({ 
                    category, 
                    name: validName 
                }).toArray();
                
                if (duplicates.length > 1) {
                    console.log(`   🔄 Found ${duplicates.length} copies of "${validName}"`);
                    // Keep the first one, delete the rest
                    for (let i = 1; i < duplicates.length; i++) {
                        await foodsCollection.deleteOne({ _id: duplicates[i]._id });
                        console.log(`   ❌ Deleted duplicate: ${validName}`);
                        totalDeleted++;
                    }
                }
            }
        }
        
        console.log(`\n\n📊 Final Count:\n`);
        const categories = await foodsCollection.distinct('category');
        for (const category of categories) {
            const count = await foodsCollection.countDocuments({ category });
            console.log(`  ${category}: ${count} items`);
        }
        
        const total = await foodsCollection.countDocuments();
        console.log(`\n  Total: ${total} items`);
        console.log(`\n🎉 Cleaned ${totalDeleted} duplicate/invalid items!`);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

cleanDuplicates();
