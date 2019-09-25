const express = require('express');
const router = express.Router();

const {
  create,
  taskById,
  read,
  remove,
  update,
  list
} = require('../controllers/task');
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get('/task/:taskId', read);
router.post('/task/create/:userId', requireSignin, isAuth, create);
router.delete(
  '/task/:taskId/:userId',
  requireSignin,
  isAuth,
  remove
);

router.put(
  '/task/:taskId/:userId',
  requireSignin,
  isAuth,
  update
);


router.get('/tasks', list);

router.param('userId', userById);
router.param('taskId', taskById);


module.exports = router;