const router = require("express").Router();

// Event controllers
const {
  addNewEvent,
  eventList,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

//task validation
const { validateEvent } = require("../../util/eventValidation");

//routes
router.post("/add-new", validateEvent, addNewEvent);
router.get("/list", eventList);
router.post("/update", validateEvent, updateEvent);
router.delete("/delete", deleteEvent);

module.exports = router;
