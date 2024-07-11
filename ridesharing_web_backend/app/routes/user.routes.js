const express = require("express");

const router = express.Router();

//controller
const controller = require("../controllers/user.controller");

router.get("/get/:id", controller.getUser);

router.put("/update/:id", controller.updateUser);

router.post("/upload-docs/:id", controller.uploadDocs);

router.get("/docs", controller.getDocs);

router.put("/doc/:id", controller.verifyDocs);

router.delete("/doc/:id", controller.deleteDocs);

module.exports = router;
