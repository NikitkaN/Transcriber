import jwt from 'jsonwebtoken';

const secret = 'SECRET';

export const createToken = (user) => {
  return jwt.sign({ id: user.email }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
