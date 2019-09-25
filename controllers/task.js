const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Task = require('../models/task');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.taskById = (req, res, next, id) => {
  Task.findById(id)
  .exec((err, task) => {
    if(err || !task) {
      return res.status(400).json({
        error: 'Task not found'
      });
    }
    req.task = task
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.task);
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {

    //check for all fields in task
    const {
      name,
      description,
      date
    } = fields;

    if (
      !name ||
      !description ||
      !date
    ) {
      return res.status(400).json({
        error: 'All fields required'
      });
    }

    let product = new Task(fields)

    product.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result);
    })
  })
};

exports.remove = (req, res) => {
  let task = req.task;
  task.remove((err, deletedTask) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      'message': 'task successfully deleted'
    })
  })
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {

    let task = req.task;
    task = _.extend(task, fields);

    task.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result);
    })
  })
};

exports.list = (req, res) => {
  Task.find()
    .exec((err, tasks) => {
      if (err) {
        return res.status(400).json({
          error: 'Tasks not found'
        });
      }
      res.json(tasks)
    });
};