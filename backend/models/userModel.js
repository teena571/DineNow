import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false}, // Optional for OAuth users
    role: {type: String, enum: ['customer', 'staff', 'admin'], default: 'customer'},
    googleId: {type: String, unique: true, sparse: true},
    avatar: {type: String},
    refreshToken: {type: String},
    createdAt: {type: Date, default: Date.now}
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
