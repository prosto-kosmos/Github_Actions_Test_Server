import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['info'],
    });
  }

  async enableShutsownHooks(app: INestApplication): Promise<void> {
    process.on('beforeExit', () => {
      app.close();
    });
  }
}
