const express = require("express");
const multer = require("multer");
const path = require("path");
const  {check, validationResult, body} = require("express-validator");



// const validateLogin= [
//     check('email').isEmail().withMessage("Email invalido"),
//     check('password').isLength({min: 6}).withMessage("La contraseña es invalida")

// ];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../public/images/users"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage });

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/register", usersController.register );
router.post("/register",upload.single('usersImage'), usersController.createUser);

router.get("/login", usersController.login );
router.post("/login", usersController.loginProcess);

router.get("/profile", usersController.profile);


module.exports = router;