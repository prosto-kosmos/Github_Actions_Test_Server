import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Record } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private appRepository: AppRepository) {}

  async getRecords(): Promise<Record[]> {
    return await this.appRepository.getRecords();
  }
}
