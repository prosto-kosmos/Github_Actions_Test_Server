import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Record } from '@prisma/client';
import { RecordCreate, RecordUpdate } from './interfaces/record.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello world!';
  }

  @Get('records')
  async getRecords(): Promise<Record[]> {
    return await this.appService.getRecords();
  }

  @Get('record/:id')
  async getRecordById(@Param('id') recordId: string): Promise<Record> {
    return await this.appService.getRecordById(Number(recordId));
  }

  @Post('record')
  async createRecord(@Body() record: RecordCreate): Promise<Record> {
    return await this.appService.createRecord(record);
  }

  @Put('record/:id')
  async updateRecord(
    @Param('id') recordId: string,
    @Body() record: RecordUpdate,
  ): Promise<Record> {
    return await this.appService.updateRecord(Number(recordId), record);
  }

  @Delete('record/:id')
  async deleteRecord(@Param('id') recordId: string): Promise<void> {
    return await this.appService.deleteRecord(Number(recordId));
  }
}
