const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/register", usersController.register );

router.get("/login", usersController.login );


module.exports = router;