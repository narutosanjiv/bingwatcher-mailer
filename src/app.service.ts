import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  transporter: any;
  logger = new Logger('mailer');
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: configService.get('SMTP_USERNAME'), // generated ethereal user
        pass: configService.get('SMTP_PASSWORD'), // generated ethereal password
      },
    });
  }

  async sendMail(to_email: string, subject: string, message: string) {
    const info = await this.transporter.sendMail({
      from: 'narutosanjiv@gmail.com',
      to: to_email,
      subject: '${subject} ✔', // Subject line
      text: message, // plain text body
      html: '<b>${message}</b>', // html body
    });

    this.logger.log('log info:');
    this.logger.log(info);
  }
}
