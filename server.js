// Libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


// App Config
dotenv.config({ path: ".env" });
const app = express();
const port = process.env.PORT || 8000;
const url = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(url, {
    useNewUrlParser: true,
}).then((conn) => {
    console.log(`Connected to MongoDB on ${conn.connection.host}`);
}).catch((err) => {
    console.log(err);
});

// Listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
