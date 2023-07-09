const express = require("express");
const router = express.Router();
const multer = require("multer");

//Define storage for the files with multer diskStorage engine to store the files in the uploads folder in the public folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const documentController = require("../controllers/documentController");

// Route to get document by ID
router.get("/:id", documentController.getDocumentById);

// Route to get document List
router.get("/", documentController.getDocumentList);

// Route to POST upload Document
router.post(
  "/upload",
  upload.single("file"),
  documentController.uploadDocument
);

router.delete("/:id", documentController.deleteDocument);


// Route to POST update Document by ID
router.put("/:id", documentController.updateDocument);

router.delete("/category/:id", documentController.deleteCategory);

router.post("/category", documentController.createCategory);



module.exports = router;
