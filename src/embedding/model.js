// Libraries
const mongoose = require("mongoose");


// Schema
const embeddingSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
    },
    
    chunk_id: {
        type: Number,
        required: [true, "Chunck ID is required"],
    },
    
    text_chunk: {
        type: String,
        required: [true, "Text chunk is required"],
    },
    
    embedding_vector: {
        type: [Number],
        required: [true, "Embedding vector is required"],
    },

    chunk_metadata: {
        page_no: {
            type: Number,
            required: [true, "Page number is required"],
        },
        offset: {
            type: Number,
            required: [true, "Offset is required"],
        },
    },
}, {
    timestamps: true,
});

// Model
const Embedding = mongoose.model("Embedding", embeddingSchema);

// Export
module.exports = Embedding;
