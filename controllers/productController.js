const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");
const getAllProducts = async (req, res) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection.find().toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
};

const getAllProductById = async (req, res) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const product = await productCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  const categoryCollection = db.collection("categories");
  const category = await categoryCollection.findOne({
    _id: new ObjectId(product.categoryId),
  });
  if (product) {
    product.category = category;
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
  }

  const db = await connectDb();
  const productCollection = db.collection("products");

  try {
    const newProduct = { name, description, price, category };
    const result = await productCollection.insertOne(newProduct);
    res
      .status(201)
      .json({ message: "Sản phẩm đã được thêm", product: result.ops[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm sản phẩm", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params; // Assuming product ID is passed as a parameter
  const { name, description, price, category } = req.body;

  // Validate that at least one field is provided for updating
  if (!name && !description && !price && !category) {
    return res
      .status(400)
      .json({ message: "Cần ít nhất một trường để cập nhật" });
  }

  const db = await connectDb();
  const productCollection = db.collection("products");

  try {
    // Find the product by ID and update the fields
    const result = await productCollection.updateOne(
      { _id: new require("mongodb").ObjectId(id) }, // Convert id to ObjectId
      { $set: { name, description, price, category } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
    }

    res.status(200).json({ message: "Sản phẩm đã được cập nhật" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật sản phẩm", error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Product ID passed as a URL parameter

  const db = await connectDb();
  const productCollection = db.collection("products");

  try {
    // Find the product by ID and delete it
    const result = await productCollection.deleteOne({
      _id: new require("mongodb").ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
    }

    res.status(200).json({ message: "Sản phẩm đã được xóa" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
