
const path = require ('path');


const controller = {
     index: (req, res) => {
         res.render(path.join(__dirname,'../views/index.ejs'))
     },
     contact:  (req, res) => {
        res.render(path.join(__dirname,'../views/contactUs.ejs'))
    },
    
};

module.exports = controller;