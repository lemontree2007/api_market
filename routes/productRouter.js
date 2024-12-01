const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductById,
} = require("../controllers/productController");



router.get("/", getAllProducts);
router.get("/:id", getAllProductById);

module.exports = router;
