const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/api/v1/users")
  .get(userController.getAllUsers)
  .post(userController.createUsers);
router
  .route("/api/v1/users/:id")
  .get(userController.getUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

router.post("/signup", authController.signup);

module.exports = router;
