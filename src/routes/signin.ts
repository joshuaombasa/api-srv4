import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    response.send({});
  }
);

export { signinRouter };
