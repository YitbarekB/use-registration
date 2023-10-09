const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create a MongoDB connection.
mongoose.connect("mongodb://localhost:27017/phone-book", {
  useNewUrlParser: true,
});

// Define the phone book schema.
const phoneBookSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String },
});

// Create the phone book model.
const PhoneBook = mongoose.model("PhoneBook", phoneBookSchema);

// Create an Express application.
const app = express();

// Enable CORS for all origins
app.use(cors({ origin: true }));

app.use(bodyParser.json());

// Define a route for the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Create a route to register a new phone number.
app.post("/register", async (req, res) => {
  // Get the phone number from the request body.
  console.log(req.body);
  const phoneNumber = req.body.phoneNumber;

  // Create a new phone book entry.
  const phoneBookEntry = new PhoneBook({
    phoneNumber,
  });

  // Save the phone book entry to the database.
  await phoneBookEntry.save();

  // Send a success response.
  res.json({ message: "Phone number registered successfully." });
});

// Start the Express server.
app.listen(7000);
