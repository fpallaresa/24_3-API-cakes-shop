import { Cart, ICart } from "../entities/cart-entity";
import { Document } from "mongoose";

const getAllCarts = async (page: number, limit: number): Promise<Document<ICart>[]> => {
  return await Cart.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("user");
};

const getCartCount = async (): Promise<number> => {
  return await Cart.countDocuments();
};

const getCartById = async (id: string): Promise<Document<ICart> | null> => {
  return await Cart.findById(id).populate("user");
};

const createCart = async (cartData: any): Promise<Document<ICart>> => {
  const cart = new Cart(cartData);
  const document: Document<ICart> = (await cart.save()) as any;

  return document;
};

const deleteCart = async (id: string): Promise<Document<ICart> | null> => {
  return await Cart.findByIdAndDelete(id);
};

const updateCart = async (id: string, cartData: any): Promise<Document<ICart> | null> => {
  return await Cart.findByIdAndUpdate(id, cartData, { new: true, runValidators: true });
};

export const cartOdm = {
  getAllCarts,
  getCartCount,
  getCartById,
  createCart,
  deleteCart,
  updateCart
};
