import { json } from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';

async function main() {
  const app = express();

  app.use(json());
  app.use(express.urlencoded({ extended: false }));

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
