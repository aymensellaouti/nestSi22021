import { NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

export class FirstMiddleware implements NestMiddleware{
  use(req: any, res: Response, next: () => void): any {
    // if (req.method != 'POST') {
    //   // res.status(403);
    //   // res.json('Your are note allowed');
    //   // return res;
    // }
    next();
  }

}
