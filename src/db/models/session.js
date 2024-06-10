// src/db/models/user.js
import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('users', sessionSchema);
// userId - string, required;
// accessToken - string, required;
// refreshToken - string, required;
// accessTokenValidUntil - Date, required;
// refreshTokenValidUntil - Date, required;
