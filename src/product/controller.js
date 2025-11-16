// Models
const Product = require("./model");

// Services
const { client } = require('../../services/redis_client');

// Constants
const DEFAULT_TTL = 60 * 5; // 5 minutes

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
};

const listProducts = async (req, res, next) => {
  try {
    const filter = { ...req.query };
    const products = await Product.find(filter);
    res.status(200).json({ data: products, count: products.length });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cacheKey = `product:${id}`;

    const cached = await client.get(cacheKey);
    if (cached) {
      // cached is stringified JSON
      return res.json(JSON.parse(cached));
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 3) Populate cache (set with TTL)
    await client.setEx(cacheKey, DEFAULT_TTL, JSON.stringify(product));

    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
