const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/products/create", addProduct);
router.post("/products/edit", updateProduct);
router.get("/products/delete", deleteProduct);

module.exports = router;
