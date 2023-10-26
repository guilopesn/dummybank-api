import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { description, version } from '../package.json';

const logger: Logger = new Logger('NestApplication');

function initializeSwaggerUi(app: NestApplication): void {
  logger.log('Initializing Swagger UI...');

  const siteTitle: string = `${description} | Documentação`;

  let documentBuilder: DocumentBuilder = new DocumentBuilder();

  documentBuilder = documentBuilder.setTitle(siteTitle);

  documentBuilder = documentBuilder.setVersion(version);

  const config: Omit<OpenAPIObject, 'paths'> = documentBuilder.build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  const options: SwaggerCustomOptions = {
    customSiteTitle: siteTitle,
  };

  SwaggerModule.setup('docs', app, document, options);

  logger.log('Swagger UI successfully initialized');
}

async function main(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule);

  initializeSwaggerUi(app);

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.getOrThrow('APP_PORT'));

  logger.log(`Nest application is running on ${await app.getUrl()}`);
}

void main();
