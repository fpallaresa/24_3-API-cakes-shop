import { type NextFunction, type Request, type Response } from "express";
import { cartOdm } from "../odm/cart.odm";

const getAllCarts= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as any;
    const limit = req.query.limit as any;

    const carts = await cartOdm.getAllCarts(page, limit);

    const totalElements = await cartOdm.getCartCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: carts,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getCartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cart = await cartOdm.getCartById(id);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdCart = await cartOdm.createCart(req.body);
    res.status(201).json(createdCart);
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cartDeleted = await cartOdm.deleteCart(id);
    if (cartDeleted) {
      res.json(cartDeleted);
    } else {
      res.status(404).json({ error: "Cart was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cartUpdated = await cartOdm.updateCart(id, req.body);
    if (cartUpdated) {
      res.json(cartUpdated);
    } else {
      res.status(404).json({ error: "Cart was not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const cartService = {
  getAllCarts,
  getCartById,
  createCart,
  deleteCart,
  updateCart,
};
