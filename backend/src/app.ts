import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect('mongodb://root:example@mongo:27017/').catch((error: Error) => {
  console.log('UNABLE TO CONNECT TO MONGO', error);
});
