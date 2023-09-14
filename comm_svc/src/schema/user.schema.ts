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
    unique: [true, 'email already exists in database!'],
    required: [true, 'email not provided'],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["dev", "admin"],
    required: [true, "Please specify user role"]
  },
  comapany: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
