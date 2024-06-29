import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { User, build } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body();
    console.log({ email, password });

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentails');
    }

    const isPasswordMatch = await Password.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      throw new BadRequestError('Invalid credentails');
    }

    const userToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.id,
      },
      'asdf'
    );

    request.session = { jwt: userToken };

    response.status(200).send(existingUser);
  }
);

export { signinRouter };
