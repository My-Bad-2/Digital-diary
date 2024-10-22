const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  data: { type: String, required: true },
  tag: { type: String, default: "General" },
});

module.exports = mongoose.model("Record", recordSchema);
