import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/common.filter';

async function bootstrap(): Promise<void> {
  const APP_PORT = process.env.API_PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(APP_PORT, () =>
    console.log(`Server is running on port ${APP_PORT}`),
  );
}
bootstrap();
