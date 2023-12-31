require("dotenv").config();

//express Framework
const express = require("express");
const app = express();
app.use(express.json());

//parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable All CORS Requests for now
const cors = require("cors");
app.use(cors());

// Routes
const eventRoutes = require("./api/routes/event");
const joinusFormRoutes = require("./api/routes/joinusForm");
const sponsorFormRoutes = require("./api/routes/sponsorForm");
app.use("/event", eventRoutes);
app.use("/joinusForm", joinusFormRoutes);
app.use("/sponsorForm", sponsorFormRoutes);

// setting mongoose connection while starting server
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log("Server up and running on PORT:", process.env.APP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
