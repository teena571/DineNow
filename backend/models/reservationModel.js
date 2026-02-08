import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    tableNo: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    guests: { type: Number, required: true },
    notes: { type: String },
    timestamp: { type: Date, default: Date.now }
});

const reservationModel = mongoose.models.reservation || mongoose.model("reservation", reservationSchema);

export default reservationModel;
