import type { Document, Model } from "mongoose";

import type INotification from "../interfaces/INotification";
import type INotificationData from "../interfaces/INotificationData";
import type INotificationRepository from "../interfaces/INotificationRepository";

class NotificationRepository implements INotificationRepository {
  constructor(private readonly notificationModel: Model<INotification>) {}

  public createNotification = async (
    data: INotificationData
  ): Promise<Document<unknown, {}, INotification> & INotification> => {
    return this.notificationModel.create(data);
  };

  public getNotificationsByRecipient = async (
    recipient: string
  ): Promise<(Document<unknown, {}, INotification> & INotification)[]> => {
    return this.notificationModel.find({ recipient }).sort({ createdAt: -1 });
  };

  public getNotificationById = async (
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    return this.notificationModel.findOne({ _id: id });
  };

  public updateNotificationById = async (
    id: string,
    data: Partial<INotification>
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    return this.notificationModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
  };

  public deleteNotificationById = async (
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    return this.notificationModel.findByIdAndDelete(id);
  };

  public markAsReadById = async (
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    return this.notificationModel.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
  };
}

export default NotificationRepository;
