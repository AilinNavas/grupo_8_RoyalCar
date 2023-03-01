const express = require("express");

const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index);

router.get("/register", mainController.register);

router.get("/login", mainController.login);

router.get("/productCart", mainController.productCart);

router.get("/productCreate", mainController.productCreate);

router.get("/productEdit", mainController.productEdit);

module.exports = router;