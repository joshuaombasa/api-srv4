import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
// import cors from 'cors'
import cookieSession from 'cookie-session';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { signinRouter } from './routes/signin';

const app = express();
const port = 4000;

app.use(express.json());
app.set('trust-proxy', false);
// app.use(cors())
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(signoutRouter);
app.use(signinRouter)

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:27017/auth-11?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1`
    );
    console.log('connected to mongodb');
  } catch (error) {
    console.log(error);
  }

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

start();
