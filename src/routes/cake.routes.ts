/**
 * @swagger
 * tags:
 *   name: Cake
 *   description: The cakes managing API
 */
import express from "express";
import multer from "multer";
import { cakeService } from "../domain/services/cake.service";
const upload = multer({ dest: "public" });

export const cakeRouter = express.Router();

/**
 * @swagger
 * /cake:
 *   get:
 *     summary: Lists all cakes
 *     tags: [Cake]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: The list of cakes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cake'
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: Invalid page or limit parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
cakeRouter.get("/", cakeService.getAllCakes);

/**
 * @swagger
 * /cake/{id}:
 *   get:
 *     summary: Get a cake by ID
 *     tags: [Cake]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cake ID
 *     responses:
 *       200:
 *         description: The cake info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cake'
 *       404:
 *         description: Cake not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
cakeRouter.get("/:id", cakeService.getCakeById);

/**
 * @swagger
 * /cake:
 *   post:
 *     summary: Create a new cake
 *     tags: [Cake]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cake'
 *     responses:
 *       201:
 *         description: The cake was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cake'
 *       400:
 *         description: Missing parameters or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
cakeRouter.post("/", cakeService.createCake);

/**
 * @swagger
 * /cake/{id}:
 *   delete:
 *     summary: Delete a cake by ID
 *     tags: [Cake]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cake ID
 *     responses:
 *       200:
 *         description: The cake was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cake'
 *       404:
 *         description: The cake was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
cakeRouter.delete("/:id", cakeService.deleteCake);

/**
 * @swagger
 * /cake/{id}:
 *   put:
 *     summary: Update a cake by ID
 *     tags: [Cake]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cake ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cake'
 *     responses:
 *       200:
 *         description: The cake was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cake'
 *       400:
 *         description: Some parameters are missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: The cake was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
cakeRouter.put("/:id", cakeService.updateCake);


/**
 * @swagger
 * /cake/image-upload:
 *   post:
 *     summary: Upload a image for a cake
 *     tags: [Cake]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The file to upload.
 *       - in: formData
 *         name: cakeId
 *         type: string
 *         description: The id of the cake
 *     responses:
 *       200:
 *         description: The image was uploaded successfully
 *       404:
 *         description: The cake was not found
 */
cakeRouter.post("/image-upload", upload.single("image"), cakeService.updateCakeImage);