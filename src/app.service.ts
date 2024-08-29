import { HttpStatus, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Record } from '@prisma/client';
import { RecordCreate, RecordUpdate } from './interfaces/record.interface';
import { HttpExceptionCustom } from './common/common.exception';

@Injectable()
export class AppService {
  constructor(private appRepository: AppRepository) {}

  async getRecords(): Promise<Record[]> {
    return await this.appRepository.getRecords();
  }

  async getRecordById(recordId: number): Promise<Record> {
    await this.checkExistRecordById(recordId);

    return await this.appRepository.getRecordById(recordId);
  }

  async createRecord(record: RecordCreate): Promise<Record> {
    return await this.appRepository.createRecord({
      name: record.name,
      description: record.description,
    });
  }

  async updateRecord(recordId: number, record: RecordUpdate): Promise<Record> {
    await this.checkExistRecordById(recordId);

    return await this.appRepository.updateRecord(recordId, {
      name: record.name,
      description: record.description,
    });
  }

  async deleteRecord(recordId: number): Promise<void> {
    await this.checkExistRecordById(recordId);

    await this.appRepository.deleteRecord(recordId);
  }

  async checkExistRecordById(recordId: number): Promise<void> {
    const record = await this.appRepository.getRecordById(recordId);

    if (!record) {
      throw new HttpExceptionCustom(
        'Record with this id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
