const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const expressValidator = require("express-validator");
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected!'));
mongoose
  .connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)});

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


// routes middleware
app.use('/api', authRoutes);
app.use("/api", userRoutes);
app.use('/api', taskRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});


