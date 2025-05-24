import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
