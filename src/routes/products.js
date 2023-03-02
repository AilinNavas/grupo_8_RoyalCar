const express = require('express');
const path = require('path');
const router = express.Router();


const productsController = require('../controllers/productsController');


router.get("/productCart", productsController.productCart);

router.get("/productCreate", productsController.productCreate);

router.get("/productEdit", productsController.productEdit);


module.exports = router;