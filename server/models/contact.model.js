const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String
  })
);

module.exports = Contact;