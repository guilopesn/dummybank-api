import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule);

  await app.listen(3000);
}

void main();
