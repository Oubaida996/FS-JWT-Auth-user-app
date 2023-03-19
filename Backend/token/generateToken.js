const jwt = require('jsonwebtoken');

// Making function parameter mandatory:
const isRequired = () => {
  throw new Error('Parameter is required');
};


const generateToken = (email = isRequired(), id = isRequired()) => {
  let newToken = jwt.sign({ email: email, id: id }, process.env.SECRET);
  return newToken;
};

module.exports = generateToken;
