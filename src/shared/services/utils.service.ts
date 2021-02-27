import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  logger(message) {
    console.log(message);
  }
}
