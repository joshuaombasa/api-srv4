import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor() {
    super('Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
