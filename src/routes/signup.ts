import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { User, build } from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body();
    console.log({ email, password });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('User with email already exists');
    }

    const hashedPassword = await Password.toHash(password);

    const userObject = build({ email, password: hashedPassword });
    const savedUser = await userObject.save();
    const userToken = jwt.sign(
      {
        email: savedUser.email,
        id: savedUser.id,
      },
      'asdf'
    );

    request.session = { jwt: userToken };

    response.status(201).send(savedUser);
  }
);

export { signupRouter };
