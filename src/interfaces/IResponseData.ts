import type { Document } from "mongoose";
import type INotification from "./INotification";

export default interface IResponseData {
  status: string;
  data: {
    statusCode: number;
    message: string;
    content?:
      | (Document<unknown, {}, INotification> & INotification)
      | (Document<unknown, {}, INotification> & INotification)[];
  };
}
