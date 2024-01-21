import express from "express";
import upload from "../../../../middleware/upload.js";
const app = express();
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
  getAllMasterData,
  getAllHome,
  getAllProductsAddToCartCount,
  getAllProductsAddToCart,
} from "./product.js";

app.post(
  "/create",
  upload.fields([
    {
      name: "images",
      maxCount: 7,
    },
  ]),
  create
);
app.get("/getAll", getAll);
app.get("/getAllHome", getAllHome);
app.get("/getById/:id", getById);
app.put(
  "/update/:id",
  upload.fields([
    {
      name: "images",
      maxCount: 7,
    },
  ]),
  update
);
app.delete("/delete/:id", deleteById);
app.get("/getAllMasterData", getAllMasterData);
app.get("/getAllProductsAddToCartCount", getAllProductsAddToCartCount);
app.get("/getAllProductsAddToCart", getAllProductsAddToCart);

export default app;
