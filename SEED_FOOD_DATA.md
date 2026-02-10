# 🍽️ DineNow - Food Data Seeder

## Overview
Automatically upload all 32 food items from your frontend `assets.js` to MongoDB Atlas database.

---

## ✅ What This Script Does

1. **Reads all food items** from the predefined list (32 items total)
2. **Connects to MongoDB Atlas** using your connection string
3. **Checks for duplicates** - skips items that already exist (by name)
4. **Inserts new items** into the `foods` collection
5. **Provides detailed feedback** - shows what was inserted, skipped, or failed
6. **Handles errors gracefully** - continues processing even if one item fails

---

## 📋 Prerequisites

- ✅ Node.js installed
- ✅ MongoDB Atlas account with connection string
- ✅ Backend `.env` file configured with `MONGO_URI`

---

## 🚀 Quick Start

### Step 1: Ensure MongoDB URI is Set

Edit `backend/.env` and make sure you have:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/DineNow
```

**Your current MongoDB URI:**
```
mongodb+srv://teenarai571_db_user:TeenaRaiKattri@cluster.hynxywh.mongodb.net/DineNow
```

### Step 2: Run the Seeder

```bash
cd backend
npm run seed
```

**Or directly:**
```bash
cd backend
node seedFoodData.js
```

---

## 📊 Expected Output

```
🚀 Starting DineNow Food Data Seeder...

🔄 Connecting to MongoDB Atlas...
✅ Connected to MongoDB Atlas successfully!

📦 Database: DineNow
📦 Collection: foods
📦 Total items to process: 32

✅ Inserted: "Ceaser Salad" - $12 (Salads)
✅ Inserted: "Italian Salad" - $18 (Salads)
✅ Inserted: "Spinach Salad" - $16 (Salads)
... (continues for all 32 items)

============================================================
📊 SEEDING SUMMARY
============================================================
✅ Successfully inserted: 32 items
⏭️  Skipped (duplicates): 0 items
📦 Total processed: 32 items
============================================================

📊 Total items in database: 32

🎉 Food data seeding completed successfully!

🔌 MongoDB connection closed.

✨ Seeding process finished!
```

---

## 🔄 Running Multiple Times

The script is **safe to run multiple times**:
- ✅ Existing items are **skipped** (no duplicates)
- ✅ Only new items are inserted
- ✅ Database remains consistent

**Example output on second run:**
```
⏭️  Skipped: "Ceaser Salad" (already exists)
⏭️  Skipped: "Italian Salad" (already exists)
... (all items skipped)

============================================================
📊 SEEDING SUMMARY
============================================================
✅ Successfully inserted: 0 items
⏭️  Skipped (duplicates): 32 items
📦 Total processed: 32 items
============================================================
```

---

## 📦 Food Items Included

### Categories & Items:

**Salads (4 items)**
- Ceaser Salad - $12
- Italian Salad - $18
- Spinach Salad - $16
- Chicken Salad - $24

**Rolls (4 items)**
- Lasagna Rolls - $14
- Peri Peri Rolls - $12
- Chicken Rolls - $20
- Veg Rolls - $15

**Deserts (4 items)**
- Ripple Ice Cream - $14
- Fruit Ice Cream - $22
- Jar Ice Cream - $10
- Vanilla Ice Cream - $12

**Sandwiches (4 items)**
- Chicken Sandwich - $12
- Vegan Sandwich - $18
- Grilled Sandwich - $16
- Italian Sub - $24

**Cakes (4 items)**
- Cup Cake - $14
- Vegan Cake - $12
- Butterscotch Cake - $20
- Sliced Cake - $15

**Vegetarian (4 items)**
- Garlic Mushroom - $14
- Fried Cauliflower - $22
- Mix Veg Pulao - $10
- Rice Zucchini - $12

**Pastas (4 items)**
- Fettuccine Alfredo - $12
- Tomato Pasta - $18
- Creamy Pasta - $16
- Chicken Pasta - $24

**Noodles (4 items)**
- Buttter Noodles - $14
- Veg Noodles - $12
- Somen Noodles - $20
- Cooked Noodles - $15

**Total: 32 items**

---

## 🗄️ Database Structure

**Database Name:** `DineNow`  
**Collection Name:** `foods`

**Document Structure:**
```javascript
{
  _id: "1",
  name: "Ceaser Salad",
  image: "food_1.png",
  price: 12,
  description: "Food provides essential nutrients for overall health and well-being",
  category: "Salads",
  createdAt: ISODate("2026-02-10T..."),
  updatedAt: ISODate("2026-02-10T...")
}
```

---

## 🔍 Verify Data in MongoDB

### Option 1: MongoDB Compass
1. Open MongoDB Compass
2. Connect using your connection string
3. Navigate to `DineNow` → `foods` collection
4. You should see all 32 food items

### Option 2: MongoDB Atlas Web Interface
1. Go to https://cloud.mongodb.com
2. Click "Browse Collections"
3. Select `DineNow` database
4. Select `foods` collection
5. View all documents

### Option 3: Using MongoDB Shell
```bash
mongosh "mongodb+srv://cluster.mongodb.net/DineNow" --username teenarai571_db_user

# In MongoDB shell:
use DineNow
db.foods.countDocuments()  # Should return 32
db.foods.find().pretty()   # View all items
```

---

## 🛠️ Troubleshooting

### Error: "MongoServerError: Authentication failed"
**Solution:** Check your MongoDB URI credentials in `.env`

### Error: "ECONNREFUSED"
**Solution:** 
- Check internet connection
- Verify MongoDB Atlas cluster is running
- Check if IP address is whitelisted in MongoDB Atlas

### Error: "Cannot find module 'mongodb'"
**Solution:** 
```bash
cd backend
npm install mongodb
```

### Items Not Showing in Frontend
**Solution:** Make sure your backend API is serving from the correct database:
- Check `backend/config/db.js` uses the same database name
- Restart your backend server after seeding

---

## 🔄 Re-seeding Data

### To Clear and Re-seed:

**Option 1: Drop collection and re-seed**
```bash
# In MongoDB shell or Compass, drop the 'foods' collection
# Then run:
npm run seed
```

**Option 2: Delete specific items**
```javascript
// In MongoDB shell:
db.foods.deleteMany({ category: "Salads" })  // Delete by category
db.foods.deleteOne({ name: "Ceaser Salad" }) // Delete by name
```

---

## 📝 Script Features

✅ **Automatic duplicate detection** - Uses food name as unique identifier  
✅ **Batch processing** - Handles all 32 items automatically  
✅ **Error handling** - Continues even if one item fails  
✅ **Detailed logging** - Shows progress for each item  
✅ **Summary report** - Final statistics at the end  
✅ **Safe to re-run** - Won't create duplicates  
✅ **Timestamps** - Adds createdAt and updatedAt fields  
✅ **Connection management** - Properly closes MongoDB connection  

---

## 🎯 Next Steps

After seeding:

1. **Verify data** - Check MongoDB Atlas or Compass
2. **Test API** - Make sure backend can fetch food items
3. **Test frontend** - Browse menu on http://localhost:5173
4. **Add more items** - Edit `seedFoodData.js` and add to `food_list` array

---

## 📞 Support

If you encounter issues:
1. Check MongoDB Atlas connection
2. Verify `.env` file has correct `MONGO_URI`
3. Ensure MongoDB driver is installed: `npm install mongodb`
4. Check backend console for detailed error messages

---

## ✨ Success!

Once seeding is complete, your DineNow application will have:
- ✅ 32 food items in MongoDB
- ✅ 8 categories (Salads, Rolls, Deserts, etc.)
- ✅ All items with images, prices, and descriptions
- ✅ Ready for customers to browse and order!

**Your restaurant menu is now live! 🍽️**
