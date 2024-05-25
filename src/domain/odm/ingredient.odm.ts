import { Ingredient, IIngredient } from "../entities/ingredient-entity";
import { Document } from "mongoose";

const getAllIngredients = async (page: number, limit: number): Promise<any> => {
  return await Ingredient.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getIngredientCount = async (): Promise<number> => {
  return await Ingredient.countDocuments();
};

const getIngredientById = async (id: string): Promise<Document<IIngredient> | null> => {
  return await Ingredient.findById(id);
};

const getIngredientByName = async (name: string): Promise<Document<IIngredient>[]> => {
  return await Ingredient.find({ name: new RegExp("^" + name.toLowerCase(), "i") });
};

const createIngredient = async (ingredientData: any): Promise<Document<IIngredient>> => {
  const ingredient = new Ingredient(ingredientData);
  const document: Document<IIngredient> = (await ingredient.save()) as any;

  return document;
};

const deleteIngredient = async (id: string): Promise<Document<IIngredient> | null> => {
  return await Ingredient.findByIdAndDelete(id);
};

const updateIngredient = async (id: string, ingredientData: any): Promise<Document<IIngredient> | null> => {
  return await Ingredient.findByIdAndUpdate(id, ingredientData, { new: true, runValidators: true });
};

export const ingredientOdm = {
  getAllIngredients,
  getIngredientCount,
  getIngredientById,
  getIngredientByName,
  createIngredient,
  deleteIngredient,
  updateIngredient,
};
