import * as mongoose from 'mongoose';

export const schema = new mongoose.Schema({
  name: { type: String },
  login: { type: String },
  email: { type: String },
  birthAt: { type: Date },
  preference: {
    language: { type: String },
    theme: { type: String },
  },
  role: { type: Array },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
});

export const UserSchemaMongooseImpl = { name: 'User', schema };
