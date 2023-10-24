import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        migrations: [],
        migrationsRun: true,
        migrationsTransactionMode: 'all',
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
