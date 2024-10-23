const cors = require("cors");
const express = require("express");
const connectToDB = require("./db.js");

const PORT = 5000;

connectToDB();
var app = express();

app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/record", require("./routes/record"));

app.listen(PORT, () => {
  console.log(`Digital-diary listening on port ${PORT}`);
});
