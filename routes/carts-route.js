import { Router } from "express";
import CartManagerMdb from "../src/dao/models/cart.manager.mdb.js";

const router = Router();
const cManagerMdb = new CartManagerMdb();

router.post("/", async (req, res) => {
  try {
    const createCart = await cManagerMdb.addCartMDB();

    if (createCart) {
      res.status(200).send("Carrito Creado");
    } else {
      res.status(400).send("Error");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    let cart = await cManagerMdb.getProductsCartMDB();

    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Fail to get the carts");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/:cid", async (req, res) => {
  try {
    let id = req.params.cid;
    let cartId = await cManagerMdb.getProductsCartIdMDB(id);

    if (cartId) {
      res.status(200).send(cartId);
    } else {
      res.status(404).send("Fail to get the requested cart");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cID = req.params.cid;
    const pID = req.params.pid;
    const productToCart = await cManagerMdb.addProductsCartMDB(cID, pID)

    if (productToCart) {
      res.send("Product added to cart");
    } else if (cID === undefined) {
      res.status(404).send("Fail to get the requested cart");
    } else if (pID === undefined) {
      res.status(404).send("Fail to get the requested product in the cart");
    } else {
      res.status(404).send("Fail to get the requested cart and product");
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }
});


export default router;
