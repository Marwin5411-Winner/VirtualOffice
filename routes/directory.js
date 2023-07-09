const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const directoryController = require("../controllers/directoryController");

router.get("/", directoryController.getDirectories);

router.get("/:id", directoryController.getDirectoryById);

router.post("/", directoryController.addDirectory);

router.delete("/:id", directoryController.deleteDirectory);

router.put("/:id", directoryController.updateDirectory);


module.exports = router;