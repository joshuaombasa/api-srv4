import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

class RequestValidationError extends CustomError {
  statusCode: number = 404;

  constructor(public errors: ValidationError[]) {
    super('Not Found');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => ({ message: error.msg }));
  }
}

export { RequestValidationError };
