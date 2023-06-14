import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import successHandler from './middlewares/success_handler';
import indexRouter from './routes/index';
import { loadDatabase } from './db';

// extend response object
express.response.success = successHandler;

async function main() {
  const app = express();

  app.use(json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/transactions', indexRouter);

  await loadDatabase();

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Transaction API');
  });

  // error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      message: err.message,
      data: null,
    });
  });

  app.listen(3000);
}

main();
