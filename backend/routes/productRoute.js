import express from "express";

const productRoute = express.Router();

import { productParser } from "../config/upload.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductById,
  createReview,
  editProduct,
  getAllProducts,
} from "../controllers/productConroller.js";
import { admin, protect } from "../middleware/authMiddleware.js";

productRoute
  .route("/")
  .post(productParser.single("image"), addProduct)
  .get(getProduct);

productRoute
  .route("/:id")
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, admin, productParser.single("image"), editProduct);

productRoute.route("/:id/review").post(protect, createReview);

productRoute.route("/getAllProducts").get(protect, admin, getAllProducts);

export default productRoute;
