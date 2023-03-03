const path = require('path');


const controller = {
    productCart: (req, res) => {
        res.render(path.join(__dirname, '../views/productCart.ejs'))
    },

    productCreate: (req, res) => {
        res.render(path.join(__dirname, '../views/productCreate.ejs'))
    },

    productEdit: (req, res) => {
        res.render(path.join(__dirname, '../views/productEdit.ejs'))
    },
    productDetail: (req, res) => {
        res.render(path.join(__dirname, '../views/productDetail.ejs'))
    },

    products: (req, res) => {
        res.render(path.join(__dirname, '../views/products.ejs'))
    },

};


module.exports = controller;

