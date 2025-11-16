// Libraries
const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },

  description: {
    type: String,
    required: [true, "Product description is required"],
  },

  category : {
    type: String,
    required: [true, "Product category is required"],
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  
}, {
    timestamps: true,
});

// Model
const Product = mongoose.model("Product", productSchema);

// Export
module.exports = Product;
