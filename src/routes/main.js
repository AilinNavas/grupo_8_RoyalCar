const express = require("express");

const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index);


router.get("/contact", mainController.contact);

router.get("/construction", mainController.construction);

module.exports = router;