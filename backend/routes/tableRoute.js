import express from 'express';
import mongoose from 'mongoose';
import tableModel from '../models/tableModel.js';
import userModel from '../models/userModel.js';
import reservationModel from '../models/reservationModel.js';

const tableRouter = express.Router();

// GET /api/table - Get all tables
tableRouter.get('/', async (req, res) => {
  try {
    let tables = await tableModel.find().sort({ tableNo: 1 });
    console.log('Tables found:', tables.length);
    if (tables.length !== 20) {
      console.log('Seeding tables...');
      try {
        // Drop the collection to remove corrupted data and indexes
        await tableModel.deleteMany({});
        const seedTables = [];
        for (let i = 1; i <= 20; i++) {
          seedTables.push({ tableNo: i, status: 'available' });
        }
        await tableModel.insertMany(seedTables);
        console.log('Seeded tables');
        tables = await tableModel.find().sort({ tableNo: 1 });
        console.log('Tables after seeding:', tables.length);
      } catch (seedError) {
        console.error('Seeding failed:', seedError.message);
        // If seeding fails, return existing tables
        tables = await tableModel.find().sort({ tableNo: 1 });
      }
    }
    res.json({ success: true, tables: tables.map(table => ({ _id: table._id, tableNo: table.tableNo, status: table.status })) });
  } catch (error) {
    console.error('Error in GET tables:', error);
    res.json({ success: false, message: 'Error fetching tables' });
  }
});

// POST /api/table/reserve/:tableNo - Reserve a table
tableRouter.post('/reserve/:tableNo', async (req, res) => {
  try {
    const { tableNo } = req.params;
    const tableNoInt = parseInt(tableNo);
    if (isNaN(tableNoInt)) {
      return res.status(400).json({ success: false, message: 'Invalid table number' });
    }
    const { name, guests, phone, notes } = req.body;

    // Validate phone: must be exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone must be exactly 10 digits' });
    }

    // Check if user exists by phone
    let user = await userModel.findOne({ phone });
    let userId;
    if (user) {
      userId = user._id;
    } else {
      // Create new guest user
      const newUser = new userModel({ name, phone, email: phone });
      await newUser.save();
      userId = newUser._id;
    }

    // Reserve table atomically to prevent race conditions
    const table = await tableModel.findOneAndUpdate(
      { tableNo: tableNoInt, status: 'available' },
      { status: 'reserved' },
      { new: true }
    );
    if (!table) {
      return res.json({ success: false, message: 'Table not found or already occupied' });
    }

    // Create reservation document
    const reservation = new reservationModel({
      tableNo: parseInt(tableNo),
      userId,
      guests,
      notes
    });
    await reservation.save();

    res.json({ success: true, message: 'Table reserved successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error reserving table' });
  }
});

// Temporary route to reseed tables (for admin use)
tableRouter.get('/reseed', async (req, res) => {
  try {
    // Drop the collection to start fresh
    await tableModel.deleteMany({});
    const seedTables = [];
    for (let i = 1; i <= 20; i++) {
      seedTables.push({ tableNo: i, status: 'available' });
    }
    await tableModel.insertMany(seedTables);
    res.json({ success: true, message: 'Tables reseeded' });
  } catch (error) {
    console.error('Error reseeding:', error);
    res.json({ success: false, message: 'Error reseeding tables' });
  }
});

// Route to drop collection
tableRouter.get('/drop', async (req, res) => {
  try {
    await mongoose.connection.db.dropCollection('tables');
    res.json({ success: true, message: 'Collection dropped' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Route to reset all tables to available (for testing)
tableRouter.get('/reset', async (req, res) => {
  try {
    await tableModel.updateMany({}, { status: 'available' });
    res.json({ success: true, message: 'All tables reset to available' });
  } catch (error) {
    console.error('Error resetting tables:', error);
    res.json({ success: false, message: 'Error resetting tables' });
  }
});

// GET /api/table/user/:userId - Get user's active reservation
tableRouter.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Get the latest reservation for this user
    const reservation = await reservationModel.findOne({ userId }).sort({ _id: -1 });
    if (!reservation) {
      return res.json({ success: false, message: 'No reservation found' });
    }
    res.json({ success: true, reservation });
  } catch (error) {
    console.error('Error fetching user reservation:', error);
    res.json({ success: false, message: 'Error fetching reservation' });
  }
});

export default tableRouter;
