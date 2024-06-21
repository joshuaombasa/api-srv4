import express, { Request, Response, NextFunction } from 'express';
const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  async (request: Request, response: Response, next: NextFunction) => {

  }
);

export {signupRouter}
