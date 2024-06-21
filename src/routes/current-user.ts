import express, { Request, Response, NextFunction } from 'express';
const currentuserRouter = express.Router();

currentuserRouter.post(
  '/api/users/currentuser',
  async (request: Request, response: Response, next: NextFunction) => {

  }
);

export {currentuserRouter}
