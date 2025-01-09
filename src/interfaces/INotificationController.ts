import type { Request, Response } from "express";

export default interface INotificationController {
  create(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  markAsRead(req: Request, res: Response): Promise<Response>;
  deleteTask(req: Request, res: Response): Promise<Response>;
  updateTask(req: Request, res: Response): Promise<Response>;
}
