import Joi from "joi";
import type { Schema } from "mongoose";

class JoiValidator {
  public static createNotificationSchema = Joi.object({
    recipient: Joi.string().min(3).max(50).required().messages({
      "string.base": "The recipient must be a string.",
      "string.min": "The recipient must have at least 3 characters.",
      "string.max": "The recipient must have a maximum of 50 characters.",
      "any.required": "The recipient is mandatory.",
    }),
    message: Joi.string().min(3).required().messages({
      "string.base": "The message must be a string.",
      "string.min": "The message must have at least 3 characters.",
      "any.required": "The message is mandatory.",
    }),
    read: Joi.boolean().messages({
      "string.base": "The message must be a boolean.",
    }),
    mail: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        "string.base": "The message must be a string.",
        "string.email": "Please provide a valid email address.",
      }),
  });

  public static getAllSchema = Joi.object({
    recipient: Joi.string().min(3).max(50).required().messages({
      "string.base": "The recipient must be a string.",
      "string.min": "The recipient must have at least 3 characters.",
      "string.max": "The recipient must have a maximum of 50 characters.",
      "any.required": "The recipient is mandatory.",
    }),
  });

  public static idParamSchema = Joi.object({
    id: Joi.string().min(3).max(30).required().messages({
      "string.base": "The ID must be a string.",
      "string.min": "The ID must have at least 3 characters.",
      "string.max": "The ID must have a maximum of 30 characters.",
      "any.required": "The ID is mandatory.",
    }),
  });

  public static updateNotificationBodySchema = Joi.object({
    recipient: Joi.string().min(3).max(50).messages({
      "string.base": "The recipient must be a string.",
      "string.min": "The recipient must have at least 3 characters.",
      "string.max": "The recipient must have a maximum of 50 characters.",
    }),
    message: Joi.string().min(3).messages({
      "string.base": "The message must be a string.",
      "string.min": "The message must have at least 3 characters.",
    }),
    read: Joi.boolean().messages({
      "string.base": "The message must be a boolean.",
    }),
    mail: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        "string.base": "The message must be a string.",
        "string.email": "Please provide a valid email address.",
      }),
  });
}

export default JoiValidator;
