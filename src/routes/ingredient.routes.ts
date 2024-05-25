/**
 * @swagger
 * tags:
 *   name: Ingredient
 *   description: The ingredients managing API
 */

import express from "express";
import { ingredientService } from "../domain/services/ingredient.service";

export const ingredientRouter = express.Router();

/**
 * @swagger
 * /ingredient:
 *   get:
 *     summary: Lists all the ingredients
 *     tags: [Ingredient]
 *     responses:
 *       200:
 *         description: The list of the ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ingredient'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
ingredientRouter.get("/", ingredientService.getAllIngredients);

/**
 * @swagger
 * /ingredient/{id}:
 *   get:
 *     summary: Get a ingredient by ID
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: The ingredient info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 */
ingredientRouter.get("/:id", ingredientService.getIngredientById);

/**
 * @swagger
 * /ingredient/name/{name}:
 *   get:
 *     summary: Get a ingredient by name
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient name
 *     responses:
 *       200:
 *         description: The ingredient info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: The ingredient was not found
 */
ingredientRouter.get("/name/:name", ingredientService.getIngredientByName);

/**
 * @swagger
 * /ingredient:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: The ingredient was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: The request body is incorrect or missing
 */
ingredientRouter.post("/", ingredientService.createIngredient);

/**
 * @swagger
 * /ingredient/{id}:
 *   delete:
 *     summary: Deletes a ingredient
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: The ingredient was deleted successfully
 *       404:
 *         description: The ingredient was not found
 */
ingredientRouter.delete("/:id", ingredientService.deleteIngredient);

/**
 * @swagger
 * /ingredient/{id}:
 *   put:
 *     summary: Update a ingredient
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: The ingredient was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: The request body is incorrect or missing
 *       404:
 *         description: The ingredient was not found
 */
ingredientRouter.put("/:id", ingredientService.updateIngredient);
