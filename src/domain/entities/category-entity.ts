/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the category
 *        name:
 *          type: string
 *          description: The name of the category
 */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
