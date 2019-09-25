exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'Email must be between 3 to 32 characters')
    .matches(/\w+@\w+\.\w+/)
    .withMessage('email must be in valid format')
    .isLength({
      min: 4,
      max: 32
    });
  req.check('password', 'Password is required').notEmpty();
  req.check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/^\w/)
    .withMessage("Password must contain at least one special character")
    .matches(/\d/)
    .withMessage("Password must contain at least one number");
  const errors = req.validationErrors()
    if(errors) {
      const firstError = errors.map(error => error.msg)[0]
      return res.status(400).json({ error: firstError });
    }
    next();
};

//matches(/.+\@.+\..+/)
//special characters: ^\w
  //meaning any character that does not match a word character