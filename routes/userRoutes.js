const express = require("express");
const {
  getAllUsers,
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("./../controllers/userController");

const router = express.Router();

router.route("/api/v1/users").get(getAllUsers).post(createUsers);
router
  .route("/api/v1/users/:id")
  .get(getUsers)
  .patch(updateUsers)
  .delete(deleteUsers);

module.exports = router;
