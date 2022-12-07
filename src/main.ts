import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SocketAdapter } from "./socketadapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS,PATCH"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");

    next();
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Users Endpoints")
    .setDescription("The Users API")
    .setVersion("1.0")
    .addTag("Users")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  await app.listen(3002);
}
bootstrap();
