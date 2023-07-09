const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


//create Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user.admin == 1) {
        next();
    } else {
        res.render("error", { message: "You are not authorized to view this page" });
    }
};

router.get("/", isAdmin, (req, res) => {
    res.render('admin/index', { title: global.config.WEB.name })
});

router.get("/users", isAdmin, adminController.getUsers);

router.delete("/users/:id", isAdmin, adminController.deleteUser);

router.post("/users/role", isAdmin, adminController.createRole);

router.delete("/users/role/:id", isAdmin, adminController.deleteRole);

router.post("/users", isAdmin, adminController.createUser);

module.exports = router;