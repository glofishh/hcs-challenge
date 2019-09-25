const User = require("../models/user");


exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: "User not found"
          });
      }
      req.profile = user;
      next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.getAllTasks = (req, res) => {
  User.find({user: req.profile._id}, (err, data) => { 
    if (err) {
      return res.status(400).json({
      error: 'cannot retrieve all tasks of user'
      });
    }
    console.log(req.profile.tasks.length);
    res.json(req.profile.tasks)
  });
};