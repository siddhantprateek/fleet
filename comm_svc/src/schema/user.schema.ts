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
    }, 
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    comapany: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})
