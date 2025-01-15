import { Router } from "express";
import NotificationRepository from "../repositories/NotificationRepository";
import Notification from "../models/Notification";
import NotificationService from "../services/NotificationService";
import NotificationController from "../controllers/NotificationController";
import joiValidate from "../middlewares/joiValidate";
import createNotificationSchema from "../validations/JoiValidator";
import JoiValidator from "../validations/JoiValidator";

const notificationRepository = new NotificationRepository(Notification);
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

const router = Router();

router.post(
  "/",
  joiValidate(JoiValidator.createNotificationSchema, "body"),
  notificationController.create
);
router.get(
  "/:recipient",
  joiValidate(JoiValidator.getAllSchema, "params"),
  notificationController.getAll
);
router.put(
  "/:id/read",
  joiValidate(JoiValidator.idParamSchema, "params"),
  notificationController.markAsRead
);
router.put(
  "/:id",
  joiValidate(JoiValidator.idParamSchema, "params"),
  joiValidate(JoiValidator.updateNotificationBodySchema, "body"),
  notificationController.updateTask
);
router.delete(
  "/:id",
  joiValidate(JoiValidator.idParamSchema, "params"),
  notificationController.deleteTask
);

export default router;
