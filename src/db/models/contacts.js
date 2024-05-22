import { model, Schema } from 'mongoose';

const contacstShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    required: true,
    enum: ['personal', 'work', 'home'],
    default: 'personal',
  },
  createdAt: {
    treems: true,
  },
  updatedAt: {
    treems: true,
  },
});
export const Contact = model('contacts', contacstShema);
