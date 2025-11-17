// Libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Services
const {connectRedis} = require("./services/redis_client")

// App Config
dotenv.config({ path: ".env" });
const app = express();
const port = process.env.PORT || 8000;
const url = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(url).then((conn) => {
    console.log(`Connected to MongoDB on ${conn.connection.host}`);
}).catch((err) => {
    console.log(err);
});

// Redis Connection
app.use(async(req, res, next) => {
    await connectRedis();
    next()
});


// routes
app.use("/products", require("./src/product/router"));

// Listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
