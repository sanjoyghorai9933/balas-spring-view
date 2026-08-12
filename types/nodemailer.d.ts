declare module "nodemailer" {
  type TransportOptions = {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
    [key: string]: unknown;
  };

  type MailOptions = {
    from?: string;
    to?: string;
    replyTo?: string;
    subject?: string;
    html?: string;
    text?: string;
    [key: string]: unknown;
  };

  const nodemailer: {
    createTransport(options: TransportOptions): {
      sendMail(options: MailOptions): Promise<unknown>;
    };
  };

  export default nodemailer;
}
