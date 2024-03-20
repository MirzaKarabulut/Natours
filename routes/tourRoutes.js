const express = require("express");
const {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
} = require("./../controllers/tourController");

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllTour).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;