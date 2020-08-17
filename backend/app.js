require("dotenv").config(); //importing dotenv module (generally imported at the top)

const express = require("express");

//importing all middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//connecting to local database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to db!"))
  .catch(() => console.log("Error in connecting with db!"));

const app = express();

//parse json
app.use(bodyParser.json());

//parse cookies
app.use(cookieParser());

app.use(cors());

//routes
const authRoutes = require("./routes/auth");

app.use("/auth",authRoutes);


//port allocation and firing up the server
const port = process.env.PORT || 5000; //process.env.PORT is the environment variable for port

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
