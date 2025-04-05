/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import * as serverless from 'serverless-http'; // ✔️ dùng import dạng namespace
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

const bootstrap = async () => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await app.init();
};

bootstrap();

export const handler: Handler = serverless(expressApp);
