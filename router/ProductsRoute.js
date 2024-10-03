import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readProductManager = () => {
  return new Promise((resolve, reject) => {
    const productManagerPath = path.join(
      __dirname,
      "../src/ProductManager.json"
    );
    fs.readFile(productManagerPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const ProductsRouter = Router();

const getProduct = async (id) => {
  // Retorna caso não haja id
  if (!id) return;

  const file = await readProductManager();
  const product = file.products.filter((product) => product.id == id);

  // Produto encontrado com o id enviado
  return product;
};

const getProductList = async (limit = null) => {
  // Retorna a lista completa se não tiver limite
  const { products } = await readProductManager();

  if (!limit) return products;

  // Retorna lista limitada
  return products.slice(0, limit);
};

ProductsRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await getProduct(pid);

  if (!product) return res.send("Nenhum produto encontrado!");

  return res.send(product);
});

ProductsRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  const productList = await getProductList(limit);

  return res.send(productList);
});

export default ProductsRouter;
