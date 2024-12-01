const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");


const getAllCategories = async (req, res) => {
    const db = await connectDb();
    const categoriesCollection = db.collection("categories");
    const categories = await categoriesCollection.find().toArray();
    if (categories) {
        res.status(200).json(categories);
    } else {
        res.status(404).json({ message: "Không tìm thấy" });
    }
};

const getAllCategoryById = async (req, res) => {
    try {
        const db = await connectDb();
        const categoryCollection = db.collection("categories");
        const category = await categoryCollection.findOne({
            _id: new ObjectId(req.params.id),
        });
        const productCollection = db.collection("products");
        const products = await productCollection.find({
            categoryId: category._id,
        }).toArray();
        category.products = products;
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi server" });
    }
};




module.exports = {
    getAllCategories,
    getAllCategoryById
}