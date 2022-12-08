"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const socketadapter_1 = require("./socketadapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useWebSocketAdapter(new socketadapter_1.SocketAdapter(app));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
        next();
    });
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle("Users Endpoints")
        .setDescription("The Users API")
        .setVersion("1.0")
        .addTag("Users")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.enableCors();
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map