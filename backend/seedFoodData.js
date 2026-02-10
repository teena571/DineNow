/**
 * DineNow - Food Data Seeder
 * Automatically uploads all food items from assets.js to MongoDB Atlas
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Food data - extracted from frontend assets.js
const food_list = [
    {
        _id: "1",
        name: "Ceaser Salad",
        image: "food_1.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salads"
    },
    {
        _id: "2",
        name: "Italian Salad",
        image: "food_2.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salads"
    },
    {
        _id: "3",
        name: "Spinach Salad",
        image: "food_3.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salads"
    },
    {
        _id: "4",
        name: "Chicken Salad",
        image: "food_4.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salads"
    },
    {
        _id: "5",
        name: "Lasagna Rolls",
        image: "food_5.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "6",
        name: "Peri Peri Rolls",
        image: "food_6.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "7",
        name: "Chicken Rolls",
        image: "food_7.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "8",
        name: "Veg Rolls",
        image: "food_8.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "9",
        name: "Ripple Ice Cream",
        image: "food_9.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "10",
        name: "Fruit Ice Cream",
        image: "food_10.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "11",
        name: "Jar Ice Cream",
        image: "food_11.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: "food_12.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: "food_13.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwiches"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: "food_14.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwiches"
    },
    {
        _id: "15",
        name: "Grilled Sandwich",
        image: "food_15.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwiches"
    },
    {
        _id: "16",
        name: "Italian Sub",
        image: "food_16.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwiches"
    },
    {
        _id: "17",
        name: "Cup Cake",
        image: "food_17.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cakes"
    },
    {
        _id: "18",
        name: "Vegan Cake",
        image: "food_18.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cakes"
    },
    {
        _id: "19",
        name: "Butterscotch Cake",
        image: "food_19.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cakes"
    },
    {
        _id: "20",
        name: "Sliced Cake",
        image: "food_20.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cakes"
    },
    {
        _id: "21",
        name: "Garlic Mushroom",
        image: "food_21.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetarian"
    },
    {
        _id: "22",
        name: "Fried Cauliflower",
        image: "food_22.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetarian"
    },
    {
        _id: "23",
        name: "Mix Veg Pulao",
        image: "food_23.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetarian"
    },
    {
        _id: "24",
        name: "Rice Zucchini",
        image: "food_24.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetarian"
    },
    {
        _id: "25",
        name: "Fettuccine Alfredo",
        image: "food_25.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pastas"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: "food_26.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pastas"
    },
    {
        _id: "27",
        name: "Creamy Pasta",
        image: "food_27.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pastas"
    },
    {
        _id: "28",
        name: "Chicken Pasta",
        image: "food_28.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pastas"
    },
    {
        _id: "29",
        name: "Buttter Noodles",
        image: "food_29.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "30",
        name: "Veg Noodles",
        image: "food_30.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "31",
        name: "Somen Noodles",
        image: "food_31.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "32",
        name: "Cooked Noodles",
        image: "food_32.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
];

// MongoDB Configuration
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'DineNow';
const COLLECTION_NAME = 'foods';

/**
 * Main function to seed food data
 */
async function seedFoodData() {
    let client;
    
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        
        // Connect to MongoDB
        client = new MongoClient(MONGO_URI);
        await client.connect();
        
        console.log('✅ Connected to MongoDB Atlas successfully!');
        
        // Get database and collection
        const db = client.db(DB_NAME);
        const foodsCollection = db.collection(COLLECTION_NAME);
        
        console.log(`\n📦 Database: ${DB_NAME}`);
        console.log(`📦 Collection: ${COLLECTION_NAME}`);
        console.log(`📦 Total items to process: ${food_list.length}\n`);
        
        let insertedCount = 0;
        let skippedCount = 0;
        let updatedCount = 0;
        
        // Process each food item
        for (const foodItem of food_list) {
            try {
                // Check if food item already exists by name
                const existingFood = await foodsCollection.findOne({ name: foodItem.name });
                
                if (existingFood) {
                    console.log(`⏭️  Skipped: "${foodItem.name}" (already exists)`);
                    skippedCount++;
                } else {
                    // Insert new food item
                    await foodsCollection.insertOne({
                        ...foodItem,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                    console.log(`✅ Inserted: "${foodItem.name}" - $${foodItem.price} (${foodItem.category})`);
                    insertedCount++;
                }
            } catch (error) {
                console.error(`❌ Error processing "${foodItem.name}":`, error.message);
            }
        }
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 SEEDING SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Successfully inserted: ${insertedCount} items`);
        console.log(`⏭️  Skipped (duplicates): ${skippedCount} items`);
        console.log(`📦 Total processed: ${food_list.length} items`);
        console.log('='.repeat(60));
        
        // Verify final count
        const totalInDB = await foodsCollection.countDocuments();
        console.log(`\n📊 Total items in database: ${totalInDB}`);
        
        console.log('\n🎉 Food data seeding completed successfully!');
        
    } catch (error) {
        console.error('\n❌ Error during seeding process:');
        console.error(error);
        process.exit(1);
    } finally {
        // Close connection
        if (client) {
            await client.close();
            console.log('\n🔌 MongoDB connection closed.');
        }
    }
}

// Run the seeder
console.log('🚀 Starting DineNow Food Data Seeder...\n');
seedFoodData()
    .then(() => {
        console.log('\n✨ Seeding process finished!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
