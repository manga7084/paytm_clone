const express = require("express");
const cors = require("cors");
//const bodyPaser = require("body-parser");
const rootRouter = require("./routes/index");

const app = express();
app.use(cors());

//app.use(bodyPaser.json());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, (err) => {
  if (err) {
    console.error("the error is", error);
  } else {
    console.log("backend server is running on localhost:3000");
  }
});
module.exports = app;
