const express = require('express');
const app = express();
const cors = require("cors"); // connect with the frontend
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

// middleware
app.use(cors());
app.use(express.json());

// create, delete, update the user
// create, delete, update the product
// create, delete, update the supplier
// create, delete, update the category

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
