/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      required:
 *        - user
 *        - items
 *        - status
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the cart
 *        user:
 *          type: string
 *          description: The user ID who owns this cart
 *        items:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              cake:
 *                type: string
 *                description: The ID of the cake
 *              quantity:
 *                type: number
 *                description: The quantity of the cake
 *        status:
 *          type: string
 *          description: The status of the cart (active, paid, cancelled)
 */

import mongoose from "mongoose";
import { CartStatusEnum } from "../enums/CartStatusEnum"; 
const Schema = mongoose.Schema;

export interface ICart {
  user: mongoose.Types.ObjectId;
  items: {
    cake: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  status: string[];
}

// Creamos el schema del carrito de la compra
const cartSchema = new Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        cake: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cake",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    status: [{
      type: String, 
      enum: Object.values(CartStatusEnum),
      default: "active" 
    }],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
