import type { Document } from "mongoose";
import type INotificationData from "./INotificationData";
import type INotification from "./INotification";

export default interface INotificationRepository {
  createNotification(
    data: INotificationData
  ): Promise<Document<unknown, {}, INotification> & INotification>;
  getNotificationsByRecipient(
    recipient: string
  ): Promise<(Document<unknown, {}, INotification> & INotification)[]>;
  getNotificationById(
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null>;
  updateNotificationById(
    id: string,
    data: Partial<INotification>
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null>;
  deleteNotificationById(
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null>;
  markAsReadById(
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null>;
}
