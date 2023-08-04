const express = require("express");
const router = express.Router();
const controller = require("../../controller/personController");
const userController = require("../../controller/userController");
const adminController = require("../../controller/adminController");
const updateAdmin = require("../../controller/saveAdminProfile");
const courseController = require("../../controller/coursesController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  dest: "./images/",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

router.get("/displayperson/:id", controller.displayPerson);
router.get("/displayadmin/:id", updateAdmin.getAdmin);
router.post("/createperson", upload.single("file"), controller.createPerson);
router.post("/updateAdmin", upload.single("file"), updateAdmin.updateAdmin);
router.post("/user", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/getuser/:id", userController.getUser);
router.post("/registeradmin", adminController.createUser);
router.post("/adminlogin", adminController.userLogin);
router.get("/getadminuser/:id", adminController.getUser);
router.post("/submitModule", courseController.createModule);
router.get("/getmodules", courseController.displayModule);
router.post("/submitcourse", courseController.createCourse);

module.exports = router;
