import { Response } from 'express';

function successHandler(this: Response, data: any): void {
  this.json({
    data,
  });
}

export default successHandler;
