const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const productsController = require('../controllers/productsController');

router.get("/", productsController.products);

router.get("/productCart", productsController.productCart);

router.get("/productCreate", productsController.productCreate);

router.get("/edit/:id", productsController.edit);
router.put("/:id", upload.single("image"),productsController.update);

router.delete('/:id', productsController.destroy);

router.get("/productDetail", productsController.productDetail);




module.exports = router;