const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000
    },
    date: {
      type: Date,
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model('Task', taskSchema);