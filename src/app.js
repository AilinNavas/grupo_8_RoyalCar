const express = require("express");
const path = require("path");
const methodOverride = require('method-override'); //para poder usar metodos Put y delete


const app = express();

//Middlewares globales
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));// para poder recibir informacion por post
app.use(express.json());// para poder recibir informacion  por post
app.use(methodOverride('_method')); //para poder pisar el mothod- 'post' en el form por put y delete

//Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Sistema de rutas
const mainRoutes = require("./routes/main.js");
const productsRouter = require('./routes/products.js');
const usersRouter = require('./routes/usersRoutes.js')

app.use('/', mainRoutes);
app.use('/products', productsRouter);
app.use('/users', usersRouter);


//Pagina no encontrada
app.use((req, res, next) => {
    res.status(404).render('notFound');
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

module.exports = app;