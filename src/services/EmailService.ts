import type { Transporter } from "nodemailer";
import transporter from "../config/NodemailerTransporter";
import { InternalServerError } from "../helpers/ApiError";

class MailService {
  public static sendMail = async (
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> => {
    try {
      transporter.sendMail({
        from: "Matheus Pavaneli <matheusprojectsemail@gmail.com>",
        to,
        subject,
        text,
        html,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerError(
        "Unable to send email. Please try again later."
      );
    }
  };
}

export default MailService;
