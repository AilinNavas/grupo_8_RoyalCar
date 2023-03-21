const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../database/products.json');
function getProducts() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}



const controller = {
    //(GET) Mostrar todos los productos
    products: (req, res) => {
        const products = getProducts();
        res.render('products', { products });
    },
    
    //(GET) Mostrar formulario de creacion de producto
    formCreate: (req, res) => {
        res.render(path.join(__dirname, '../views/formCreate'))
    },

    productCart: (req, res) => {
        res.render(path.join(__dirname, '../views/productCart'))
    },
    
    

    productEdit: (req, res) => {
        res.render(path.join(__dirname, '../views/productEdit.ejs'))
    },
    productDetail: (req, res) => {
        res.render(path.join(__dirname, '../views/productDetail.ejs'))
    },

   

};


module.exports = controller;

