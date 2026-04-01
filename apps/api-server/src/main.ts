import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

config({
  path: resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  // Configure CORS so frontend apps can call this API from different origins
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : [
        'https://nexus-rifa.onrender.com',
        'https://nexus-rifa-jwi51tf00-adrianoisrael7s-projects.vercel.app',
        'https://nexus-rifa-sigma.vercel.app',
      ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        // Allow non-browser clients like mobile apps and curl
        callback(null, true);
        return;
      }
      if (process.env.CORS_ORIGIN) {
        const allowed = allowedOrigins;
        if (allowed.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
        return;
      }

      // Allow any origin in environments where CORS_ORIGIN is not set
      callback(null, true);
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nexus Rifa API')
    .setDescription('API for Nexus Rifa application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
