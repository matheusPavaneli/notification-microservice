import type { Request, Response } from "express";
import type INotificationRepository from "../interfaces/INotificationRepository";
import type INotificationService from "../interfaces/INotificationService";
import type IResponseData from "../interfaces/IResponseData";
import createResponseData from "../helpers/createResponseData";
import type INotificationController from "../interfaces/INotificationController";
import MailService from "../services/EmailService";

class NotificationController implements INotificationController {
  constructor(private readonly notificationService: INotificationService) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const {
      recipient,
      message,
      read,
      mail,
    }: { recipient: string; message: string; read: boolean; mail: string } =
      req.body;

    const notification = await this.notificationService.createNotification({
      recipient,
      message,
      mail,
      read,
    });

    const responseData: IResponseData = createResponseData(
      200,
      "Your notification has been created successfully",
      notification
    );

    if (mail) {
      const mailHtmlContent = this.getDinamicNotificationContentMail(
        recipient,
        message,
        notification?._id as string,
        read,
        "Created"
      );

      MailService.sendMail(
        mail,
        `Notification`,
        `The notification ${notification._id} has been created.`,
        mailHtmlContent
      );
    }

    return res.status(200).json(responseData);
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const recipient: string = req.params.recipient;

    const notifications =
      await this.notificationService.getNotificationsByRecipient(recipient);

    const responseData: IResponseData = createResponseData(
      200,
      "",
      notifications
    );

    return res.status(200).json(responseData);
  };

  markAsRead = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const notification = await this.notificationService.markAsReadById(id);

    const responseData: IResponseData = createResponseData(
      200,
      "Your notification has been updated sucessfully!",
      notification!
    );

    const accountMail = notification?.mail;
    if (accountMail) {
      const mailHtmlContent = this.getDinamicNotificationContentMail(
        notification?.recipient,
        notification?.message,
        notification?._id as string,
        notification?.read,
        "Updated"
      );

      MailService.sendMail(
        accountMail,
        `Notification`,
        `The notification ${notification._id} has been updated.`,
        mailHtmlContent
      );
    }

    return res.status(200).json(responseData);
  };

  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const notification =
      await this.notificationService.deleteNotificationById(id);

    const responseData: IResponseData = createResponseData(
      200,
      "Your notification has been deleted sucessfully!",
      notification!
    );

    const accountMail = notification?.mail;
    if (accountMail) {
      const mailHtmlContent = this.getDinamicNotificationContentMail(
        notification?.recipient,
        notification?.message,
        notification?._id as string,
        notification?.read,
        "Deleted"
      );

      MailService.sendMail(
        accountMail,
        `Notification`,
        `The notification ${notification._id} has been deleted.`,
        mailHtmlContent,
      );
    }

    return res.status(200).json(responseData);
  };

  updateTask = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const {
      recipient,
      message,
      read,
    }: { recipient: string; message: string; read: boolean } = req.body;

    const dataObject = Object.fromEntries(
      Object.entries({ recipient, message, read }).filter(
        ([_, value]) => value !== undefined
      )
    );

    const notification = await this.notificationService.updateNotificationById(
      id,
      dataObject
    );

    const responseData: IResponseData = createResponseData(
      200,
      "Your notification has been updated sucessfully!",
      notification!
    );

    const accountMail = notification?.mail;
    if (accountMail) {
      const mailHtmlContent = this.getDinamicNotificationContentMail(
        notification?.recipient,
        notification?.message,
        notification?._id as string,
        notification?.read,
        "Updated"
      );

      MailService.sendMail(
        accountMail,
        `Notification`,
        `The notification ${notification._id} has been updated.`,
        mailHtmlContent
      );
    }

    return res.status(200).json(responseData);
  };

  private getDinamicNotificationContentMail = (
    recipient: string,
    message: string,
    id: string,
    read: boolean,
    method: string
  ): string => {
    return `
    <h1>Notification ${method}</h1>
    <p><strong>Recipient:</strong> ${recipient}</p>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Notification ID:</strong> ${id}</p>
    <p><strong>Read:</strong> ${read}</p>
  `;
  };
}

export default NotificationController;
