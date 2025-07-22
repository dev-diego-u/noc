import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendMailOptions {
  to: string | string[]; // 📩 Dirección del destinatario (ej: "cliente@ejemplo.com")
  subject: string; // 📝 Asunto del correo (ej: "Tu tarea fue completada")
  htmlBody: string; // 💬 Cuerpo del correo en formato HTML
  attachements?: Attachement[]; // 📎 Archivos adjuntos
}

export interface Attachement {
  filename: string; // Nombre del archivo
  path: string; // Ruta del archivo
}

export class EmailService {
  //transporte
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements,
      });
      // console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h1>Logs de sistema - NOC</h1>
      <p>Saludos, Diego Alfaro</p>
      <p>Se adjuntan los logs del sistema.</p>
    `;
    const attachements: Attachement[] = [
      {
        filename: "logs-all.log",
        path: "logs/logs-all.log",
      },
      {
        filename: "logs-medium.log",
        path: "logs/logs-medium.log",
      },
      {
        filename: "logs-high.log",
        path: "logs/logs-high.log",
      },
    ];
    return this.sendEmail({ to, subject, htmlBody, attachements });
  }
}
