import { HttpException } from '@nestjs/common';

export class HttpExceptionCustom extends HttpException {
  constructor(message: string, statusCode: number) {
    super({ errors: { error: message } }, statusCode);
  }
}
