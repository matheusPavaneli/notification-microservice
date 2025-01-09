import { type Document } from "mongoose";

import type INotificationData from "../interfaces/INotificationData";
import type INotificationRepository from "../interfaces/INotificationRepository";
import type INotification from "../interfaces/INotification";
import type INotificationService from "../interfaces/INotificationService";
import {
  ConflictError,
  InternalServerError,
  NoContentError,
  NotFoundError,
} from "../helpers/ApiError";

class NotificationService implements INotificationService {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  createNotification = async (
    data: INotificationData
  ): Promise<Document<unknown, {}, INotification> & INotification> => {
    try {
      const notification =
        await this.notificationRepository.createNotification(data);
      return notification;
    } catch (err) {
      throw new InternalServerError("Unable to create this notification");
    }
  };

  getNotificationById = async (
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    try {
      const notification =
        await this.notificationRepository.getNotificationById(id);
      return notification;
    } catch (err) {
      throw new InternalServerError("Unable to get this notification");
    }
  };

  getNotificationsByRecipient = async (
    recipient: string
  ): Promise<(Document<unknown, {}, INotification> & INotification)[]> => {
    try {
      const notification =
        await this.notificationRepository.getNotificationsByRecipient(
          recipient
        );
      return notification;
    } catch (err) {
      throw new InternalServerError("Unable to get these notification");
    }
  };

  updateNotificationById = async (
    id: string,
    data: Partial<INotification>
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    try {
      const notification = await this.getNotificationById(id);

      if (!notification) {
        throw new NotFoundError("No task was found with that ID");
      }

      const hasChanges: boolean = Object.entries(data).some(
        ([key, value]) => notification[key as keyof INotification] !== value
      );

      if (!hasChanges) {
        throw new NoContentError("No changes detected. Please try again");
      }

      const updatedNotification =
        await this.notificationRepository.updateNotificationById(id, data);
      return updatedNotification;
    } catch (err) {
      if (err instanceof NotFoundError || NoContentError) {
        throw err;
      }

      throw new InternalServerError("Unable to update this notification");
    }
  };

  deleteNotificationById = async (
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    try {
      const notification = await this.getNotificationById(id);

      if (!notification) {
        throw new NotFoundError("No task was found with that ID");
      }

      const deletedTask =
        await this.notificationRepository.deleteNotificationById(id);
      return deletedTask;
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw err;
      }

      throw new InternalServerError("Unable to delete this notification");
    }
  };

  markAsReadById = async (
    id: string
  ): Promise<(Document<unknown, {}, INotification> & INotification) | null> => {
    try {
      const notification = await this.getNotificationById(id);
      const hasRead = notification?.read;

      if (hasRead) {
        throw new ConflictError("This notification is already marked as read");
      }

      const updatedNotification =
        await this.notificationRepository.markAsReadById(id);
      return updatedNotification;
    } catch (err) {
      if (err instanceof ConflictError) {
        throw err;
      }

      throw new InternalServerError("Unable to mark as read this notification");
    }
  };
}

export default NotificationService;
