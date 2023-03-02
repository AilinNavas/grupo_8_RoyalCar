const express = require ("express");
const path = require("path");


const mainRoutes = require("./routes/main.js");
const productsRouter = require('./routes/products.js');

const app = express();

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));


app.set ("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));


 app.use("/", mainRoutes);
 app.use("/register", mainRoutes);
 app.use("/login", mainRoutes);
 app.use("/productCart", productsRouter);
 app.use("/productCreate" , productsRouter);
 app.use("/productEdit" , productsRouter);

// app.use('/' , mainRoutes);
// app.use ('/products' , productsRouter);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
});

