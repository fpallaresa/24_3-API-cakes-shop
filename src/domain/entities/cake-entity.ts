/**
 * @swagger
 * components:
 *  schemas:
 *    Cake:
 *      type: object
 *      required:
 *        - title
 *        - price
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the cake
 *        title:
 *          type: string
 *          description: The title of the cake
 *        description:
 *          type: string
 *          description: The description of the cake
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          description: An array of image URLs for the cake
 *        price:
 *          type: string
 *          description: The price of the cake
 *        servings:
 *          type: string
 *          description: The number of servings of the cake
 *        allergens:
 *          type: array
 *          items:
 *            type: string
 *          description: The allergens present in the cake
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *          description: The categories of the cake
 *        ingredients:
 *          type: array
 *          items:
 *            type: string
 *          description: The ingredients used in the cake
 */

import mongoose from "mongoose";
import { AllergensEnum } from "../enums/AllergensEnum";
const Schema = mongoose.Schema;

export interface ICake {
  title: string;
  description: string;
  images: string[];
  price: string;
  servings: string;
  allergens: string[];
  categories?: mongoose.Types.ObjectId[];
  ingredients?: mongoose.Types.ObjectId[];
}

// Creamos el schema de la tarta
const cakeSchema = new Schema<ICake>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 150,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    images: {
      type: [String],
      required: false,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    servings: {
      type: String,
      required: false,
      trim: true,
    },
    allergens: [{
      type: String,
      required: false,
      enum: Object.values(AllergensEnum),
      trim: true,
    }],
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }],
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    }],
  },
  {
    timestamps: true,
  }
);

export const Cake = mongoose.model<ICake>("Cake", cakeSchema);
