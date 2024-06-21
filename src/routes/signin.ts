import express, { Request, Response, NextFunction } from 'express';
const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  async (request: Request, response: Response, next: NextFunction) => {

  }
);

export {signinRouter}
