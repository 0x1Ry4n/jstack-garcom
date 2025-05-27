import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

export const IngredientModel = model('Ingredient', ingredientSchema);
