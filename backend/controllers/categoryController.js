import category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ Error: "Please provide category name!" });
    }

    const existingCategory = await category.findOne({ title });
    if (existingCategory) {
      return res.status(400).json({ Error: "Category already exists!" });
    }

    const newCategory = await category.create({ title });
    return res.status(201).json({ newCategory });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const Category = await category.findById(req.params.id);
    return res.status(200).json({ Category });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const AllCategories = await category.find({});
    return res.status(201).json({ AllCategories });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const updateCategory = await category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    return res.status(200).json({ updateCategory });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

export {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
