import type { Document } from "mongoose";
import type INotification from "../interfaces/INotification";
import type IResponseData from "../interfaces/IResponseData";

const createResponseData = (
  statusCode: number,
  message: string,
  content?:
    | (Document<unknown, {}, INotification> & INotification)
    | (Document<unknown, {}, INotification> & INotification)[]
): IResponseData => {
  return {
    status: "success",
    data: {
      statusCode,
      message,
      content,
    },
  };
};

export default createResponseData;
