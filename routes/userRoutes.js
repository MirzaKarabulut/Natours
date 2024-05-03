const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/api/v1/users")
  .get(userController.getAllUsers)
  .post(userController.createUsers);
router
  .route("/api/v1/users/:id")
  .get(userController.getUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

module.exports = router;
