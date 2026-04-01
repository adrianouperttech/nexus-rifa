"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
(0, dotenv_1.config)({
    path: (0, path_1.resolve)(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`),
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    const allowedOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
        : [
            'https://nexus-rifa.onrender.com',
            'https://nexus-rifa-jwi51tf00-adrianoisrael7s-projects.vercel.app',
        ];
    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nexus Rifa API')
        .setDescription('API for Nexus Rifa application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map