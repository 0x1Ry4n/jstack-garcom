import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

export const CategoryModel = model('Category', categorySchema);
