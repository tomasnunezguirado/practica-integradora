import { Router } from "express";
import { ProductManager } from "../src/dao/modelsFileSystem/ProductManager.js";
import ProductManagerMdb from "../src/dao/models/product.manager.mdb.js";
import { socketServer } from "../src/app.js";

const router = Router();
const pManagerMDB = new ProductManagerMdb();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let products = await pManagerMDB.getProductsMDB();

    if (!isNaN(limit)) {
      products = products.slice(0, limit);
      return res.send(JSON.stringify(products));
    }

    res.send(JSON.stringify(products));
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productsById = await pManagerMDB.getProductsByIdMDB(id);

    if (productsById) {
      res.status(200).send(productsById);
    } else {
      res.status(404).send(`No product found with id ${id}`);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let addProduct = await pManagerMDB.addProductMDB(body);

    if (addProduct) {
      res.status(200).send("Add product successfully");
    } else {
      res.status(400).send("Fail to add");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.put("/:idUpdate", async (req, res) => {
  try {
    const idUpdate = req.params.idUpdate; 
    const body = req.body;
    const productToUpdate = await pManagerMDB.updateProductMDB(body, idUpdate);

    if (productToUpdate) {
      res.status(200).send(`The product with id ${idUpdate} has been updated successfully`);
    } else {
      res.status(404).send(`There is no product with the id ${idUpdate}`);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/:idDelete", async (req, res) => {
  try {
    const idDelete = req.params.idDelete;
    const productToDelete = await pManagerMDB.deleteProductMDB(idDelete);

    if (productToDelete) {
      res.status(200).send(`The product with id ${idDelete} has been deleted successfully`);
    } else {
      res.status(404).send(`There is no product with the id ${idDelete}`);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});


export default router;


