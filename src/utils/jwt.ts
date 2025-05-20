import jwt from 'jsonwebtoken';
const SECRET = 'your-secret-key'; // Replace with env in production

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};