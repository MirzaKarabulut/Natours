const express = require("express");
const tourController = ({
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("./../controllers/tourController"));

const router = express.Router();

// router.param("id", checkID);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTour);
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router.route("/").get(getAllTour).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
