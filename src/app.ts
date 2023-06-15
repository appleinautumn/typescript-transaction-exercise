import { json } from 'body-parser';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';

import successHandler from './middlewares/success_handler';
import indexRouter from './routes/index';

// extend response object
express.response.success = successHandler;

const app = express();
let server: any;

app.use(json());
app.use(express.urlencoded({ extended: false }));

app.use('/transactions', indexRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Transaction API');
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ?? 500).json({
    message: err.message,
    data: null,
  });
});

server = app.listen(process.env.APP_PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(
    `[${process.env.NODE_ENV}] App listening at http://${host}:${port}`
  );
});

export default server;
