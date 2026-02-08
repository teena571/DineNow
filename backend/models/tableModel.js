import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableNo: { type: Number, required: true, unique: true },
    status: { type: String, enum: ['available', 'occupied', 'reserved'], default: 'available' }
});

const tableModel = mongoose.models.table || mongoose.model("table", tableSchema);

export default tableModel;
