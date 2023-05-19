const path = require("path");
const { body } = require("express-validator");

const productValidation = [
    body("model")
        .notEmpty().withMessage('Debes completar con el modelo del vehículo').bail()
        .isLength({ min: 5 }),
    body("description")
        .notEmpty().withMessage('Debes completar con la descripcion del vehículo').bail()
        .isLength({ min: 20 }),
    body("color")
        .notEmpty().withMessage('Debes seleccionar, al menos, un color disponible'),
    body("imgFile").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!file) {
            throw new Error('Debes subir una imagen de vehículo')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(' , ')}`)
            }
        }
        return true;
    })

];

module.exports = productValidation;