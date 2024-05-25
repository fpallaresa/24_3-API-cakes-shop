import mongoose from "mongoose";
import { mongoConnect } from "../domain/repositories/mongo-repository";
import { User } from "../domain/entities/user-entity";
import { Ingredient } from "../domain/entities/ingredient-entity";
import { Category } from "../domain/entities/category-entity";
import { Cake } from "../domain/entities/cake-entity";
import { Cart } from "../domain/entities/cart-entity";

import { userList } from "./data/user.data";
import { ingredientsList } from "./data/ingredients.data";
import { categoriesList } from "./data/category.data";
import { cakesList } from "./data/cake.data";
import { cartList } from "./data/cart.data";

function getRandom<T>(arr: T[], maxSubsetSize: number): T[] {
  const subsetSize = Math.floor(Math.random() * (maxSubsetSize + 1));
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, subsetSize);
}

export const allSeed = async (): Promise<void> => {
  try {
    // Nos conectamos a la BBDD
    const dataSource = await mongoConnect();
    console.log(`Tenemos conexión!! Conectados a ${dataSource?.connection?.name as string}`);

    // Eliminamos los datos existentes
    await User.collection.drop();
    await Ingredient.collection.drop();
    await Cake.collection.drop();
    await Category.collection.drop();
    await Cart.collection.drop();
    console.log("Todos los datos eliminados");

    // Creamos ingredientes
    const ingredients = await Ingredient.create(ingredientsList);
    console.log("Ingredients creados");

    // Creamos categorías
    const categories = await Category.create(categoriesList);
    console.log("Categories creadas");

    // Creamos cakes
    const cakes = await Cake.create(cakesList);
    console.log("Cakes creadas");

    // Creamos usuarios
    const users = await User.create(userList);
    console.log("Users creados");

    // Creamos carritos y asignamos usuarios y cakes
    for (const cartData of cartList) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomCakes = getRandom(cakes, cakes.length);

      const cart = new Cart({
        user: randomUser._id,
        items: randomCakes.map((cake) => ({
          cake: cake._id,
          quantity: Math.floor(Math.random() * 3) + 1,
        })),
        status: cartData.status,
      });

      await cart.save();

      // Asignar carrito al usuario
      randomUser.cart = cart._id;
      await randomUser.save();
    }
    console.log("Carritos creados y asignados a usuarios");

    // Asignamos ingredientes a cakes
    for (const cake of cakes) {
      const randomIngredients = getRandom(ingredients, ingredients.length);
      cake.ingredients = randomIngredients.map((ingredient) => ingredient._id);
      await cake.save();
    }
    console.log("Ingredientes asignados a cakes de manera aleatoria");

    // Asignamos categorías a cakes de manera aleatoria
    for (const cake of cakes) {
      let randomCategories = getRandom(categories, Math.floor(Math.random() * categories.length));
      if (randomCategories.length === 0) {
        randomCategories = getRandom(categories, 1);
      }
      cake.categories = randomCategories.map((category) => category._id);
      await cake.save();
    }
    
    
    console.log("Categorías asignadas a cakes de manera aleatoria");

  } catch (error) {
    console.error("Error al conectar con la base de datos");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

allSeed();
