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
    


};

module.exports = controller;