/**
 * @swagger
 * components:
 *  schemas:
 *    Ingredient:
 *      type: object
 *      required:
 *        - name
 *        - quantity
 *        - typeMeasurements
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the ingredient
 *        name:
 *          type: string
 *          description: The name of the ingredient
 *        quantity:
 *          type: number
 *          description: The quantity of the ingredient
 *        typeMeasurements:
 *          type: string
 *          description: The measurement unit of the ingredient
 */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IIngredient {
  name: string;
  quantity: number;
  typeMeasurements: string;
}

const ingredientSchema = new Schema<IIngredient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    typeMeasurements: {
      type: String,
      required: true,
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

export const Ingredient = mongoose.model<IIngredient>("Ingredient", ingredientSchema);
