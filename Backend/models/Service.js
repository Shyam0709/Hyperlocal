import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description : { type: String, required: true },
    price : { type: Number, required: true },
    category : { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

export default mongoose.model('Service', ServiceSchema);