import mongoose, { Schema } from "mongoose";

import type INotification from "../interfaces/INotification";

const NotificationSchema = new Schema<INotification>({
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, required: false, default: false },
  mail: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
