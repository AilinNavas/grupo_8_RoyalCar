const path = require("path");
const { body } = require("express-validator");
const User = require('../database/models/User')


const validationsRegister = [
    body("name")
        .notEmpty().withMessage('Debes completar con tu nombre'),
    body("last_name")
        .notEmpty().withMessage('Debes completar con tu apellido'),
    body("email")
        .notEmpty().withMessage('Debes completar con un correo electronico').bail()
        .isEmail().withMessage('Debes completar con un correo electronico válido').bail(),
    body("roles")
        .notEmpty().withMessage('Debes seleccionar un rol'),
    body("password")
        .notEmpty().withMessage('Debes completar con una contraseña').bail()
        .isLength({ min: 8 }).isAlphanumeric().withMessage('La contraseña debe ser alfanumérica y tener mínimo 8 caractéres'),
    body("confirm_password")
        .notEmpty().withMessage('Debes confirmar tu contraseña'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;

        if (!file) {
            return true;
        }

        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        let fileExtension = file ? path.extname(file.originalname) : '';

        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }

        return true;
    })
]

module.exports = validationsRegister;