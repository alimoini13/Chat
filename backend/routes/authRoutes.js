import express from 'express';
import { controllers } from '../controller/auth/authController.js';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import verifyToken from '../middleware/auth.js';

const validator = createValidator({});
const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
});
router.post(
  '/register',
  validator.body(registerSchema),
  controllers.postRegister
);
router.post('/login', validator.body(loginSchema), controllers.postLogin);

router.get('/test', verifyToken, (req, res) => {
  console.log('did it');
  res.send('request passed');
});

export default router;
