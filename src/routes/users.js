const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../public/images/users"));
    },
    filename: (req, file, cb) => {
        const newFileName = "avatar" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

const usersController = require("../controllers/usersController");
const guestMidddleware = require('../middlewares/guestMiddleware');
const authMidddleware = require("../middlewares/authMiddleware");
const validationsRegister = require('../middlewares/registerValidationMiddleware');

const router = express.Router();

router.get("/register", guestMidddleware, usersController.register);
router.post("/register", upload.single('avatar'), validationsRegister, usersController.createUser);

router.get("/login", guestMidddleware, usersController.login);
router.post("/login", usersController.loginProcess);

router.get("/profile", authMidddleware, usersController.profile);

router.get('/logout', usersController.logout);

router.get("/:id/edit", usersController.edit);
router.put("/:id", upload.single('avatar'), usersController.update);

// ruta para huespedes
// router.get('/guests', usersController.guests);
// // ruta para lista de usuarios
// router.get('/usersList', usersController.usersList);


module.exports = router;