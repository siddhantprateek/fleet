import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    comapany: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})
