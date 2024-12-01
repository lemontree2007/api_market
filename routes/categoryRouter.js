const express = require("express");
const router = express.Router();
const {
    getAllCategories,
    getAllCategoryById
} = require("../controllers/categoryController");


router.get("/", getAllCategories);
router.get("/:id", getAllCategoryById);

module.exports = router;
