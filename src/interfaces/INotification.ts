import Document from "mongoose";

export default interface INotification extends Document {
  recipient: string;
  message: string;
  read: boolean;
  mail?: string;
  createdAt: Date;
}
