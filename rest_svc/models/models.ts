import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    }, 
    password: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

let userModel = mongoose.model('user', UserSchema)
export { userModel };