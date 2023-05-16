const express = require("express");
const path = require("path");

const usersController = require("../controllers/usersController");
const guestMidddleware = require('../middlewares/guestMiddleware');
const authMidddleware = require("../middlewares/authMiddleware");
const upload = require('../middlewares/multerMiddleware');
const { body } = require("express-validator");

const validationsRegister = [
    body("name")
        .notEmpty().withMessage('*Debes completar con tu nombre').bail()
        .isLength({ min: 2 }),
    body("last_name")
        .notEmpty().withMessage('*Debes completar con tu apellido').bail()
        .isLength({ min: 2 }),
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
        let acceptedExtensions = ['.jpg','.jpeg','.png','.gif'];
        
        if(!file) {
            throw new Error('*Debes subir una imagen de perfil')
        } else {
            let fileExtension = path.extname(file.originalname); 
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`*Las extensiones de archivo permitidas son ${acceptedExtensions.join(' , ')}`)
        }
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