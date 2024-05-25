import { Cake, ICake } from "../entities/cake-entity";
import { Document, Types } from "mongoose";

const getAllCakes = async (page: number, limit: number, filter?: string, value?: string): Promise<Document<ICake>[]> => {
  const query: any = {};
  if (filter && value) {
    if (filter === "categories") {
      query.categories = new Types.ObjectId(value);
    }
  }
  return await Cake.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .populate(["categories", "ingredients"]);
};

const getCakeCount = async (filter?: string, value?: string): Promise<number> => {
  const query: any = {};
  if (filter && value) {
    if (filter === "categories") {
      query.categories = new Types.ObjectId(value);
    }
  }
  return await Cake.countDocuments(query);
};

const getCakeById = async (id: string): Promise<Document<ICake> | null> => {
  return await Cake.findById(id).populate(["categories", "ingredients"]);
};

const createCake = async (cakeData: any): Promise<Document<ICake>> => {
  const cake = new Cake(cakeData);
  const document: Document<ICake> = (await cake.save()) as any;

  return document;
};

const deleteCake = async (id: string): Promise<Document<ICake> | null> => {
  return await Cake.findByIdAndDelete(id);
};

const updateCake = async (id: string, cakeData: any): Promise<Document<ICake> | null> => {
  return await Cake.findByIdAndUpdate(id, cakeData, { new: true, runValidators: true });
};

const getCakesByCategory = async (categoryId: string, page: number, limit: number): Promise<Document<ICake>[]> => {
  return await Cake.find({ categories: new Types.ObjectId(categoryId) })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate(["categories", "ingredients"]);
};

export const cakeOdm = {
  getAllCakes,
  getCakeCount,
  getCakeById,
  createCake,
  deleteCake,
  updateCake,
  getCakesByCategory
};
