const express = require('express');
const path = require('path');
const router = express.Router();


const productsController = require('../controllers/productsController');

router.get("/", productsController.products);

router.get("/productCart", productsController.productCart);

router.get("/productCreate", productsController.productCreate);

router.get("/productEdit", productsController.productEdit);

router.get("/productDetail", productsController.productDetail);




module.exports = router;