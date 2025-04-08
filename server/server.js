require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors"); // connect with the frontend
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/users');
const db = require('./routes/db');
// middleware
app.use(cors());
app.use(express.json());

// create, delete, update the user
// create, delete, update the product
// create, delete, update the supplier
// create, delete, update the category

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use('/api', db);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
