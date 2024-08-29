import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Tx } from './common/common.type';
import { Record } from '@prisma/client';
import { RecordCreate, RecordUpdate } from './interfaces/record.interface';

@Injectable()
export class AppRepository {
  constructor(private prisma: PrismaService) {}

  async getRecords(prisma: Tx = this.prisma): Promise<Record[]> {
    return await prisma.record.findMany();
  }

  async getRecordById(
    id: number,
    prisma: Tx = this.prisma,
  ): Promise<Record | null> {
    const where = { id };
    return await prisma.record.findUnique({
      where,
    });
  }

  async createRecord(
    data: RecordCreate,
    prisma: Tx = this.prisma,
  ): Promise<Record> {
    return await prisma.record.create({ data });
  }

  async updateRecord(
    id: number,
    data: RecordUpdate,
    prisma: Tx = this.prisma,
  ): Promise<Record> {
    const where = { id };
    return await prisma.record.update({
      where,
      data,
    });
  }

  async deleteRecord(id: number, prisma: Tx = this.prisma): Promise<Record> {
    const where = { id };
    return await prisma.record.delete({
      where,
    });
  }
}
