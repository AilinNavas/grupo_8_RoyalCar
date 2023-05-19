const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../public/images/products"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// filename: (req, file, cb)=>{
//     const newFileName = "product_image_" + Date.now() + path.extname(file.originalname);
//     cb(null, newFileName);
// }


const upload = multer({ storage });

const productsController = require("../controllers/productsController");
const productValidation = require("../middlewares/productValidationMiddleware");

router.get("/", productsController.products); 
router.get("/productCart", productsController.productCart);

router.get("/create", productsController.create);
router.post("/", upload.single('imgFile'), productValidation, productsController.store);

router.get("/:id", productsController.productDetail);

router.get("/:id/edit", productsController.edit);
router.put("/:id", upload.single('imgFile'),productValidation, productsController.update);

router.delete("/:id", productsController.destroy);


module.exports = router;