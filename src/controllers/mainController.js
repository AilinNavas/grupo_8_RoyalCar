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


};




module.exports = controller;