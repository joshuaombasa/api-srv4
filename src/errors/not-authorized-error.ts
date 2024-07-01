import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('not authorized' );

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

export { NotAuthorizedError };