import { type NextFunction, type Request, type Response } from "express";
import { cakeOdm } from "../odm/cake.odm";
import fs from "fs";

const getAllCakes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as any;
    const limit = req.query.limit as any;

    const cakes = await cakeOdm.getAllCakes(page, limit);

    const totalElements = await cakeOdm.getCakeCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: cakes,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getCakeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cake = await cakeOdm.getCakeById(id);
    if (cake) {
      res.json(cake);
    } else {
      res.status(404).json({ error: "Cake not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createCake = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdCake = await cakeOdm.createCake(req.body);
    res.status(201).json(createdCake);
  } catch (error) {
    next(error);
  }
};

const deleteCake = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cakeDeleted = await cakeOdm.deleteCake(id);
    if (cakeDeleted) {
      res.json(cakeDeleted);
    } else {
      res.status(404).json({ error: "Cake was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCake = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cakeUpdated = await cakeOdm.updateCake(id, req.body);
    if (cakeUpdated) {
      res.json(cakeUpdated);
    } else {
      res.status(404).json({ error: "Cake was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCakeImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Renombrado de la imagen
    const originalname = req.file?.originalname as string;
    const path = req.file?.path as string;
    const newPath = `${path}_${originalname}`;
    fs.renameSync(path, newPath);

    // Busqueda de la marca
    const cakeId = req.body.cakeId;
    const cake = cakeOdm.getCakeById(cakeId) as any;

    if (cake) {
      cake.image = newPath;
      const cakeUpdated = await cakeOdm.updateCake(cakeId, cake);
      res.json(cakeUpdated);

      console.log("Cake modificado correctamente!");
    } else {
      fs.unlinkSync(newPath);
      res.status(404).send("Cake no encontrado");
    }
  } catch (error) {
    next(error);
  }
};

export const cakeService = {
  getAllCakes,
  getCakeById,
  createCake,
  deleteCake,
  updateCake,
  updateCakeImage,
};
