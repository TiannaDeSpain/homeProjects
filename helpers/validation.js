const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
  return [
    body('item').isString(),
    body('estimatedCost').isCurrency({
      require_symbol: true,
      require_decimal: true,
      allow_negatives: false
    }),
    body('tiannaPriority').isInt({ min: 1, max: 5, allow_leading_zeroes: false }),
    body('toddPriority').isInt({ min: 1, max: 5, allow_leading_zeroes: false }),
    body('totalPriority').isInt({ min: 2, max: 10, allow_leading_zeroes: false }),
    body('store').isString(),
    body('room').isString(),
    body('transport').isString()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};
