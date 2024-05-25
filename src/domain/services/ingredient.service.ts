import { type NextFunction, type Request, type Response } from "express";
import { ingredientOdm } from "../odm/ingredient.odm";

const getAllIngredients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Asi leemos query params
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const ingredients = await ingredientOdm.getAllIngredients(page, limit);

    // Num total de elementos
    const totalElements = await ingredientOdm.getIngredientCount();

    const response = {
      pagination: {
        totalItems: totalElements,
        totalPages: Math.ceil(totalElements / limit),
        currentPage: page,
      },
      data: ingredients,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getIngredientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const ingredient = await ingredientOdm.getIngredientById(id);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

const getIngredientByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ingredientName = req.params.name;

  try {
    const ingredient = await ingredientOdm.getIngredientByName(ingredientName);
    if (ingredient?.length) {
      res.json(ingredient);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
};

const createIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdIngredient = await ingredientOdm.createIngredient(req.body);
    res.status(201).json(createdIngredient);
  } catch (error) {
    next(error);
  }
};

const deleteIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const ingredientDeleted = await ingredientOdm.deleteIngredient(id);
    if (ingredientDeleted) {
      res.json(ingredientDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

const updateIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const ingredientUpdated = await ingredientOdm.updateIngredient(id, req.body);
    if (ingredientUpdated) {
      res.json(ingredientUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const ingredientService = {
  getAllIngredients,
  getIngredientById,
  getIngredientByName,
  createIngredient,
  deleteIngredient,
  updateIngredient,
};
