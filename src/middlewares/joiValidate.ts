import type { NextFunction, Request, Response } from "express";
import type { Schema, ValidationErrorItem } from "joi";
import { BadRequestError } from "../helpers/ApiError";

const joiValidate = (schema: Schema, type: keyof Request) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[type], { abortEarly: false });
    if (error) {
      return next(
        new BadRequestError(
          error.details
            .map((err: ValidationErrorItem) => err.message)
            .join(", ")
        )
      );
    }
    return next();
  };
};

export default joiValidate;
