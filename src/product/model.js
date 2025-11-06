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

  metadata: {
    category : String,
    version: String,
  },

  images: {
    type: [String],
    required: [true, "Product images are required"],
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
  },

  manual: {
    filename: String,
    url: String,
    date : Date,
  },

  manual_status: {
    type: String,
    enum: ["uploaded", "processed", "failed"],
    default: "processed",
  },

  manual_text_summary: {
    type: String,
    default: "",
  },

  embeddings_index_version: {
    type: Date,
  },

  last_indexed_at: {
    type: Date,
  },
  
}, {
    timestamps: true,
});

// Model
const Product = mongoose.model("Product", productSchema);

// Export
module.exports = Product;
