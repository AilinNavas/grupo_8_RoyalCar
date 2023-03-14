const express = require('express');
const path = require('path');
const router = express.Router();


const productsController = require('../controllers/productsController');

router.get("/", productsController.products);

router.get("/productCart", productsController.productCart);

router.get("/create", productsController.formCreate);

router.get("/productEdit", productsController.productEdit);

router.get("/productDetail", productsController.productDetail);





module.exports = router;