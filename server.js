const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const teachers = require("./routes/teachers");
const test = require("./routes/test");
const students = require("./routes/student");
const filedownload = require("./filedownload");
const errorHandler = require("./_helpers/error-handler");
const path = require('path')
const app = express();
require("dotenv").config();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })}

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// global error handler
app.use(errorHandler);

//DB Config
const db = require("./config/key").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

//Use Routes
app.use("/api/teachers", teachers);
app.use("/api/test", test);
app.use("/api/students", students);
app.use("/api/filedownload", filedownload);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
