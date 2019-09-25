const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user');

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

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});


