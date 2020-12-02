import { Logger } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  NatsContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  logger = new Logger('AppController');

  constructor(private readonly appService: AppService) {}

  @EventPattern('send-register-email')
  async sendMail(
    @Payload() customer: any,
    @Ctx() context: NatsContext,
  ): Promise<void> {
    this.logger.log(customer);
    this.logger.log('recieve');
    await this.appService.sendMail(
      customer,
      'New Account on Bingwatcher',
      'Login to bingwatcher to know more',
    );
  }
}
