import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username :{type: String, required: true, unique : true},
    password : {type: String, required: true},
    email : {type: String, required: true, unique : true},
    name: {type: String, required: true},
    role: {type: String, enum: ['user','provider', 'admin']},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);

