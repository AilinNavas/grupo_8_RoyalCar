const express = require ("express");
const path = require("path");
const app = express();

const mainRoutes = require("./routes/main.js");

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.set ("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRoutes);
app.use("/register", mainRoutes);
app.use("/login", mainRoutes);
app.use("/productCart", mainRoutes);
app.use("/productCreate" , mainRoutes);
app.use("/productDetail" , mainRoutes);
app.use("/prueba" , mainRoutes);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
});

