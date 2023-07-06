// input validation
const { validationResult } = require("express-validator");
//model
const Event = require("../models/event");

module.exports = {
  eventList: async (req, res) => {
    try {
      //get all events
      const events = await Event.find();
      //return response
      res.status(200).json({
        message: "Fetched events successfully.",
        events: events,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
  addNewEvent: async (req, res) => {
    try {
      //data coming with the request
      const { title, date, location, description, img, status } = req.body;
      //input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Validation failed, entered data is incorrect.",
          errors: errors.array(),
        });
      }
      //create new event
      const event = new Event({
        title: title,
        date: date,
        location: location,
        description: description,
        img: img,
        status: status,
      });
      //save event
      const result = await event.save();
      //return response
      const newEvent = {
        _id: result._id.toString(),
        title: result.title,
        date: result.date,
        location: result.location,
        description: result.description,
        img: result.img,
        status: result.status,
      };
      res.status(201).json({
        message: "Event created successfully!",
        event: newEvent,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
  updateEvent: async (req, res) => {
    try {
      //data coming with the request
      const { title, date, location, description } = req.body;
      const { id } = req.query;
      //input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Validation failed, entered data is incorrect.",
          errors: errors.array(),
        });
      }
      //update event
      const updateEvent = {
        title: title,
        date: date,
        location: location,
        description: description,
      };
      const result = await Event.findByIdAndUpdate(id, updateEvent, {
        new: true,
      });
      if (result.n === 0) {
        return res.status(404).json({ message: "Event not found." });
      }
      //return response
      const updatedEvent = {
        _id: result._id.toString(),
        title: result.title,
        date: result.date,
        location: result.location,
        description: result.description,
      };
      res.status(201).json({
        message: "Event updated successfully!",
        event: updatedEvent,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      //data coming with the request
      const { id } = req.query;
      //delete event
      const result = await Event.deleteOne({ _id: id });
      if (result.n === 0) {
        return res.status(404).json({ message: "Event not found." });
      }
      //return response
      res.status(200).json({ message: "Event deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
};
