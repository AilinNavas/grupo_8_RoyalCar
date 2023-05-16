const express = require("express");
const multer = require("multer");
const path = require("path");

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
const guestMidddleware = require('../middlewares/guestMiddleware');
const authMidddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");

const validationsRegister = [
    body("name")
        .notEmpty().withMessage('*Debes completar con tu nombre'),
    body("last_name")
        .notEmpty().withMessage('*Debes completar con tu apellido'),
    body("email")
        .notEmpty().withMessage('*Debes completar con un correo electronico').bail()
        .isEmail().withMessage('*Debes completar con un correo electronico válido'),
    body("category")
        .notEmpty().withMessage('*Debes seleccionar una categoria'),
    body("password")
        .notEmpty().withMessage('*Debes completar con una contraseña').bail()
        .isLength({ min: 8 }).isAlphanumeric().withMessage('La contraseña debe ser alfanumérica y tener mínimo 8 caractéres'),
    body("confirm_password")
        .notEmpty().withMessage('*Debes confirmar tu contraseña'),
    body("usersImage").custom((value, { req }) => {
        let file = req.file;
        if(!file) {
            throw new Error('*Debes subir una imagen de perfil')
        }
        return true;
    })
]

const router = express.Router();

router.get("/register", guestMidddleware, usersController.register );
router.post("/register",upload.single('usersImage'), validationsRegister, usersController.createUser);

router.get("/login", guestMidddleware, usersController.login );
router.post("/login", usersController.loginProcess);

router.get("/profile", authMidddleware ,usersController.profile);

router.get('/logout', usersController.logout);

router.get("/:id/edit", usersController.edit);
router.put("/:id", upload.single('usersImage'),usersController.update);

// ruta para huespedes
// router.get('/guests', usersController.guests);
// // ruta para lista de usuarios
// router.get('/usersList', usersController.usersList);


module.exports = router;