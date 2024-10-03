import express from "express";
import ProductsRouter from "./router/ProductsRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", ProductsRouter);

app.listen(8080, () => {
  console.log("Running on http://localhost:8080");
});
