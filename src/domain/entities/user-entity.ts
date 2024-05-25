/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - firstName
 *        - lastName
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        firstName:
 *          type: string
 *          description: The first name of the user
 *        lastName:
 *          type: string
 *          description: The last name of the user
 *        phone:
 *          type: string
 *          description: The phone number of the user
 *        address:
 *          type: object
 *          properties:
 *            street:
 *              type: string
 *              description: The street address of address
 *            number:
 *              type: number
 *              description: The street number of address
 *            city:
 *              type: string
 *              description: The city of address
 *            postalCode: 
 *              type: string
 *              description: The Postal Code of address
 *            provinceOrState:
 *              type: string
 *              description: The Province or State of the Address
 *            country:
 *              type: string
 *              description: The Country of the Address (enum of Allowed countries)
 *        cart:
 *          type: array
 *          items:
 *            type: string
 *          description: An array of cart IDs associated with the user
 */

import { CountryEnum } from "../enums/CountryEnum";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    street: string;
    number: number;
    city: string;
    postalCode: string;
    provinceOrState: string;
    country: string;
  };
  cart?: mongoose.Types.ObjectId;
}

// Creamos el schema del usuario
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: (text: string) => validator.isEmail(text),
        message: "Email incorrecto",
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [8, "La contraseña debe tener al menos 8 caracteres"],
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 45,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 45,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: {
        street: {
          type: String,
          required: false,
          trim: true,
        },
        number: {
          type: Number,
          required: false,
        },
        city: {
          type: String,
          required: false,
          trim: true,
        },
        postalCode: {
          type: String,
          required: false,
          trim: true,
        },
        provinceOrState: {
          type: String,
          required: false,
          trim: true,
        },
        country: {
          type: String,
          required: false,
          enum: Object.values(CountryEnum),
          trim: true,
        },
      },
      required: false,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    // Si la contraseña ya estaba encriptada, no la encriptamos de nuevo
    if (this.isModified("password")) {
      const saltRounds = 10;
      const passwordEncrypted = await bcrypt.hash(this.password, saltRounds);
      this.password = passwordEncrypted;
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
