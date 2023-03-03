const path = require ('path');

const controller = {
    index: (req, res) => {
        res.render(path.join(__dirname,'../views/index.ejs'))
    },
    register: (req, res) => {
        res.render(path.join(__dirname,'../views/register.ejs'))
    },
    login: (req, res) => {
        res.render(path.join(__dirname,'../views/login.ejs'))
    },
    productCart: (req, res) => {
        res.render(path.join(__dirname,'../views/productCart.ejs'))
    },
    productCreate : (req, res) => {
        res.render(path.join(__dirname,'../views/productCreate.ejs'))
    },
    productDetail : (req, res) => {
        res.render(path.join(__dirname,'../views/productDetail.ejs'))
    },
    prueba : (req, res) => {
        res.render(path.join(__dirname,'../views/prueba.ejs'))
    },

};

module.exports = controller;