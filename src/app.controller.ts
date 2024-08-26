import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Record } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello world!';
  }

  @Get('api/records')
  async getRecords(): Promise<Record[]> {
    return await this.appService.getRecords();
  }
}
