export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message: string) {
    super(message, 422);
  }
}
export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}
export class NoContentError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
  }
}
export class NotModifiedError extends ApiError {
  constructor(message: string) {
    super(message, 304);
  }
}
