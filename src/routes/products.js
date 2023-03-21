const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/images/products'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage });



const productsController = require('../controllers/productsController');


router.get("/", productsController.products); 

router.get("/create", productsController.formCreate);
router.post('/',  upload.single('imgFile'), productsController.store);

router.get("/productCart", productsController.productCart);



router.get("/productEdit", productsController.productEdit);

router.get("/productDetail", productsController.productDetail);





module.exports = router;