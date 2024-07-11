const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");
//controller
const controller = require("../controllers/auth.controller");

router.post("/register", /*middleware,*/ controller.register);

router.post("/signin", controller.signin);

router.post("/verify/:mobile_no", controller.verify);

router.post("/admin-login", controller.adminLogin);

module.exports = router;
